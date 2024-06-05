
     import java.io.*;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.io.File;
import java.net.URL;
import java.sql.SQLException;
 
public class Geradorsquid {
 
    public static void main(String[] args) throws SQLException {
        
        TratamentoDados dado = new TratamentoDados();
        indexacoes idx = new indexacoes();
        Acessos acc = new Acessos();
        String squidLogFilePath = "C:" + File.separator + "Users" + File.separator + "fatec-dsm2" + File.separator + "Desktop" + File.separator + "DSM2" + File.separator + "br" + File.separator + "acc.txt"; // Caminho para o arquivo de log do Squid
        String positionFilePath = "C:" + File.separator + "Users" + File.separator + "fatec-dsm2" + File.separator + "Desktop" + File.separator + "DSM2" + File.separator + "br" + File.separator + "arm.txt"; // Caminho para o arquivo que armazena a última posição
        // Criar um conjunto para armazenar os sites já adicionados
        
        
        
        
        
        
while (true) {
    try {
        try (BufferedReader file = new BufferedReader(new FileReader(squidLogFilePath))) {
            String line;
            
            while ((line = file.readLine()) != null) {
                dado.setUrl(dado.extractSiteFromLogLine(line));
                dado.setIp_maquina(dado.extractIPFromLogLine(line));
                dado.setData_hora(dado.extractDateTimeFromLogLine(line));
                if(dado.getUrl() == null){
                    continue;
                }
                
               
                     
             if (!dado.getUrl().startsWith("http://") && !dado.getUrl().startsWith("https://")) {
                 
                    String site = "http://" + dado.getUrl();
                    dado.setUrl(site);
                    String pesquisa = dado.showHost(site);
                    
            }
           
        
             
Set<String> sitesAdicionados = dado.loadSitesFromFile(positionFilePath);
               if (dado.getUrl() != null && !sitesAdicionados.contains(line)) {
                   
                   
                   if(idx.pesquisar(dado.getUrl()) == false){
                       
                       System.out.println("Novo site no arquivo de log: " + dado.getUrl());
                       System.out.println("Indexando e salvando no banco " + dado.getUrl());
                         //cadastrando na tabela indexa
                    idx.setPathLocal(dado.getUrl());
                    idx.setFlag(true);
                    idx.setUrlWeb(dado.getUrl());
                    idx.setPathLocal(dado.getUrl()+".txt");
                    idx.IndexarSite();
                   }
                    
                    
                    
                     String html = "";
                    
                   
                        
                        System.out.println("--------\nNovo acesso a: " + dado.getUrl());
                        System.out.println("DataHora: " + dado.getData_hora());
                        System.out.println("máquina que acessou (ip): " + dado.getIp_maquina());
                        acc.setUrl(dado.getUrl());
                        acc.setData_hora(dado.convertToMySQLFormat(dado.getData_hora()));
                        acc.setIp_maquina(dado.getIp_maquina());
                        acc.setId_index_fk(Integer.parseInt(idx.retornarIdIndex(dado.getUrl())));
                        //System.out.println(idx.retornarIdIndex(dado.getUrl()));
                        acc.cadastrar();
                        
                        
                         try{
                    html = (dado.extractHtml(dado.getUrl()));
                             
                             
                             }
                    catch(IOException error){
                        
                        System.out.println("impossível recuperar conteúdo do site, erro: "+error );
                        
                    }
                         
                    sitesAdicionados.add(dado.getUrl());
                    dado.appendSiteToArmFile(positionFilePath, line);
                    
                    //trocando as aspas do Html p n dar erro
                    String htmlComAspasDuplas = html.replace("'", "\"");
                    //banco.setSite(htmlComAspasDuplas);
                    //criando o arquivo e salvando a localização no banco
                    String local = "C:\\Users\\fatec-dsm2\\Desktop\\DSM2\\br\\sites\\"+dado.showHost(dado.getUrl())+".txt";
                        FileWriter fl = new FileWriter(local);
                    fl.write(htmlComAspasDuplas);
                    
                    }
               
               else{
                   
               }
                
                
                
            }
        }
        TimeUnit.SECONDS.sleep(5); // Aguarda 5 segundos antes de verificar novamente
    } catch (IOException | InterruptedException e) {
        e.printStackTrace();
    }
}
    }
    
 
    }