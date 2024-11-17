import time
import threading
from pymongo import MongoClient
from tratamentoDados import TratamentoDados
from indexacoes import Indexacoes, Acessos
import requests
import os

# Configuração MongoDB Atlas
print("Tentando conectar ao MongoDB Atlas...")
try:
    client = MongoClient(">>>>sua string de conexao aqui<<<<")
except Exception as e:
    print(f"Erro ao conectar ao MongoDB Atlas: {e}")

db = client['resist']
# Inicializa as classes de tratamento, indexação e acessos
dado = TratamentoDados(db)
idx = Indexacoes(db)
acc = Acessos(db)

# Semáforo para limitar o número de requisições simultâneas
semaforo = threading.Semaphore(5)

class MonitorLog:
    def __init__(self, squid_log_file_path, position_file_path):
        self.squid_log_file_path = squid_log_file_path
        self.position_file_path = position_file_path
        self.processed_lines = set()
        print("MonitorLog inicializado com sucesso.")

    def tail_file(self):
        print("Método para ler o arquivo de log continuamente.")
        try:
            with open(self.squid_log_file_path, 'r') as file:
                print(f"Arquivo {self.squid_log_file_path} aberto para monitoramento.")
                file.seek(0, os.SEEK_END)  # Move para o final do arquivo
                
                while True:
                   # print("Aguardando novas linhas no arquivo de log...")
                    line = file.readline()
                    
                    if not line:  # Se não há uma nova linha, espera um pouco
                        time.sleep(0.1)
                        continue
                    
                    print(f"Nova linha de log detectada: {line.strip()}")
                    if line.strip() not in self.processed_lines:
                        threading.Thread(target=self.process_line, args=(line,)).start()
                        self.processed_lines.add(line.strip())
        except Exception as e:
            print(f"Erro ao monitorar o arquivo de log: {e}")

    def process_line(self, line):
        with semaforo:
            print("Iniciando processamento da linha de log.")
            url = dado.extract_site_from_log_line(line)
            if url:
                print(f"URL extraída: {url}")
                dado.url = url if url.startswith("http") else f"http://{url}"
                dado.url = dado.url.replace(":433", "")
                dado.ip_maquina = dado.extract_ip_from_log_line(line)
                dado.data = dado.extract_date_from_log_line(line)
                dado.hora = dado.extract_time_from_log_line(line)
                dado.data_hora = f"{dado.data}:{dado.hora}"
                print(f"Dados extraídos -> URL: {dado.url}, IP: {dado.ip_maquina}, Data/Hora: {dado.data_hora}")

 
                if not idx.is_site_indexed(dado.url):
                    print(f"URL não indexada previamente. Iniciando indexação de {dado.url}")
                    html = dado.extract_html(dado.url) or ""
                    termo = "explosões"  # O termo que você está verificando no HTML
               
                    flag = dado.verificar_flag_no_html(html, "explosões")
                    print(f"Verificação de palavra-chave 'explosões' no HTML: {'Encontrado' if flag else 'Não encontrado'}")

                    if flag:
                        termobd = termo
                        print(f"Adicionando {dado.url} ao arquivo bloqueados.txt e enviando notificação.")
                        with open("C:\\Users\\bruno\\Desktop\\pastas_pi\\bloqueados.txt", 'a') as bloqueados_file:
                            bloqueados_file.write(f"{dado.url}\n")
                    else:
                        termobd = ""
                    
                    clean_html = dado.remove_html_tags(html)
                    print("HTML limpo de tags para armazenamento local.")
                    print(f"\n\n~~~~~~~~~~~~\n{clean_html}\n\n~~~~~~~~~~\n\n")

                    #tirando os caracter q vai dar problema
                    nome_arquivo = dado.url.replace("http://", "").replace("https://", "").replace("/", "_").replace(":", "_").replace(".","_")

                    
                    #lugar p salvar os htmls
                    diretorio_html = r"C:\Users\bruno\Desktop\pastas_pi\htmls"
                    caminho_html = os.path.join(diretorio_html, f"{nome_arquivo}.txt")
                    
                    #se nao tiver a pasta ele cria
                    if not os.path.exists(diretorio_html):
                        os.makedirs(diretorio_html)
                    
                    #escreve o html no arquivo
                    with open(caminho_html, 'w', encoding='utf-8') as f:
                        f.write(clean_html)
                        
                    print(f"~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ caminho:{caminho_html}")
                    dado.append_site_to_arm_file(self.position_file_path, line.strip())
                    print(f"URL adicionada ao arquivo de controle: {self.position_file_path}")

                    idx.indexar_site({
                        "PathLocal": caminho_html,
                        "flag": flag,
                        "urlWeb": dado.url,
                        "termo": termobd,
                        "dataHora": dado.data_hora,
                        "ipMaquina": dado.ip_maquina,
                        "tipoInsercao": "Automatico",
                    })
                    print(f"Dados indexados com sucesso no MongoDB para a URL {dado.url}")
               
                else:
                    print(f"URL {dado.url} já indexada. Salvando como acesso.")
                    indexed_site = idx.buscar_site_por_url(dado.url)  # Função para buscar o site pelo URL
                    
                    if indexed_site:
                        flag = indexed_site.get('flag', None)  # Obter a flag do site indexado
                    else:
                        flag = None  # Se não encontrar, assume flag como None

                   
                    acc.registrar_acesso({
                        "ipMaquina": dado.ip_maquina,
                        "urlWeb": dado.url,
                        "dataHora": dado.data_hora,
                        "flag":flag
                    })
                    print(f"Acesso salvo com sucesso no MongoDB para a URL {dado.url}")
            else:
                print("Nenhuma URL válida encontrada na linha de log.")

def check_required_files():
    required_files = [
        "C:\\Users\\bruno\\Desktop\\pastas_pi\\access.txt",
        "C:\\Users\\bruno\\Desktop\\pastas_pi\\arm.txt",
        "C:\\Users\\bruno\\Desktop\\pastas_pi\\bloqueados.txt"
    ]
    
    for file_path in required_files:
        if not os.path.exists(file_path):
            with open(file_path, 'w') as f:
                pass
            print(f"Arquivo criado: {file_path}")

def main():
    check_required_files()
    squid_log_file_path = "C:\\Users\\bruno\\Desktop\\pastas_pi\\access.txt"
    position_file_path = "C:\\Users\\bruno\\Desktop\\pastas_pi\\arm.txt"
    
    print("Inicializando monitor de log...")
    monitor = MonitorLog(squid_log_file_path, position_file_path)
    monitor.tail_file()

if __name__ == "__main__":
    print("Iniciando o script principal...")
    main()
