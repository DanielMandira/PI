import React, { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import NavBar from "./partials/navBar"
import Header from "./partials/headerBar"

export default function index(){
    return(
        <>
        <section class="flex flex-row justify-start h-screen bg-gradient-to-tr from-cinza-secundario to-cinza-principal w-full h-full">
            <NavBar/>
            <section class="flex flex-col w-full lg:overflow-hidden">
                <Header/>
                <section class="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-0">
                    {/* Dashboard Principal */}
                    <section class="grid grid-flow-row px-2 lg:px-10 gap-10 lg:gap-1">
                        {/* Bem-vindo  */}
                        <div class="flex flex-col text-wrap bg-gradient-to-r from-laranja-s h-fit to-laranja-e p-5 rounded-xl">
                            <p class="text-4xl text-white">Olá, Daniel</p>
                            <p class="text-2xl text-white">Bem-vindo de volta ao seu dashboard.</p>
                        </div>
                        {/* Atividade Recente  */}
                        <div class="bg-azul-principal rounded-xl h-max">
                            <div class="flex flex-row justify-between p-3">
                                <p class="text-white text-base p-3 text-center">Atividade recente</p>
                                {/* Select Filtro  */}
                            <select class="bg-azul-principal cursor-pointer hover:brightness-75 duration-300 text-white text-base border-white border">
                                <option value="Mes">Este Mês</option>
                                <option value="Mes">Hoje</option>
                                <option value="Mes">Esta Semana</option>
                            </select>
                            </div>
                            {/* Atividades  */}
                            <div class=" bg-white h-max rounded-b-xl lg:gap-5">
                                <div class="flex flex-row justify-between p-3 items-center">
                                    <div class="flex flex-row justify-start items-center gap-5">
                                        <div class="border-2 border-azul-principal rounded-full p-2 ">
                                            <img src="/icons/bloqueio-blue.svg" class="size-5" alt=""/>
                                        </div>
                                            <p class="text-sm text-azul-text">Novo bloqueio realizado automaticamente pelo sistema</p>
                                        </div>
                                        <p class="text-sm text-azul-text">22/03/24</p>
                                    </div>
                                    <hr/>
                                    <div class="flex flex-row justify-between p-3 items-center">
                                        <div class="flex flex-row justify-start items-center gap-5">
                                            <div class="border-2 border-azul-principal rounded-full p-2 ">
                                                <img src="/icons/PC-blue.svg" class="size-5" alt=""/>
                                            </div>
                                            <p class="text-sm text-azul-text">Novo dispositivo desktop cadastrado</p>
                                        </div>
                                        <p class="text-sm text-azul-text">22/03/24</p>
                                    </div>
                                    <hr/>
                                    <div class="flex flex-row justify-between p-3 items-center">
                                        <div class="flex flex-row justify-start items-center gap-5">
                                            <div class="border-2 border-azul-principal rounded-full p-2 ">
                                                <img src="/icons/plus-blue.svg" class="size-5" alt=""/>
                                            </div>
                                            <p class="text-sm text-azul-text">Nova exceção adicionada manualmente</p>
                                        </div>
                                        <p class="text-sm text-azul-text">21/03/24</p>
                                    </div>
                                    <hr/>
                                    <div class="flex flex-row justify-between p-3 items-center">
                                        <div class="flex flex-row justify-start items-center gap-5">
                                            <div class="border-2 border-azul-principal rounded-full p-2 ">
                                                <img src="/icons/Celular-blue.svg" class="size-5" alt=""/>
                                            </div>
                                            <p class="text-sm text-azul-text">Novo dispositivo móvel cadastrado</p>
                                        </div>
                                        <p class="text-sm text-azul-text">20/03/24</p>
                                    </div>
                                    <hr/>
                                    <div class="flex flex-row justify-between p-3 items-center">
                                        <div class="flex flex-row justify-start items-center gap-5">
                                            <div class="border-2 border-azul-principal rounded-full p-2 ">
                                                <img src="/icons/user-blue.svg" class="size-5" alt=""/>
                                            </div>
                                            <p class="text-sm text-azul-text">Novo usuário criado pelo administrador</p>
                                        </div>
                                        <p class="text-sm text-azul-text">17/03/24</p>
                                    </div>
                                    <hr/>
                        </div>
                    </div>

                     {/* Bloqueios Gerais  */}
                    <div class="bg-azul-principal rounded-xl h-max">
                        <div class="flex flex-row justify-between p-3">
                            <p class="text-white text-base p-3 text-center">Visão Geral de Bloqueios</p>
                        </div>
                        <div
                            class="bg-gradient-to-l h-full flex flex-row rounded-b-xl  to-azul-gradiente-inicio from-azul-gradiente-final">
                            <div class="bg-white h-full rounded-b-xl gap-5 gap-x-10 flex flex-row p-5">
                                <img src="/icons/Rectangle.svg" alt=""/>
                                <div class="flex flex-col gap-3 items-center self-center">
                                    <div class="flex flex-row gap-2">
                                        <p class="text-4xl text-azul-text ">462 </p>
                                        <p class="text-azul-text text-base">Bloq. <br/> totais</p>
                                    </div>
                                    <div class="flex flex-row gap-2">
                                        <p class="text-red-500">+23%</p>
                                        <p class="text-azul-text text-base">Neste Mês</p>
                                    </div>
                                </div>
                                <hr/>
                                <img src="/icons/Rectangle.svg" alt=""/>
                                <div class="flex flex-col gap-3 items-center self-center">
                                    <div class="flex flex-row gap-2 items-center">
                                        <img class=" size-5" src="/icons/arrowup.svg"/>
                                        <p class="text-4xl text-azul-text ">26% </p>
                                    </div>
                                    <div class="flex flex-row gap-2">
                                        <p class="text-azul-text text-base">Desde o último mês</p>
                                    </div>
                                </div>
                            </div>
                            <div class="flex flex-col justify-center mx-auto gap-5">
                                <div class="text-center flex- flex-row justify-center">
                                    <p class="text-4xl text-white px-5">381 <span class="text-base">em
                                            maio</span></p>
                                </div>
                                <hr/>
                                <div class="text-center flex- flex-row justify-center">
                                    <p class="text-4xl text-white px-5">428 <span class="text-base">em
                                            abril</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                 {/* Dashboard Direito  */}
                <section class="flex flex-col px-10 gap-1">
                     {/* Graficos de Incidencia por sala  */}
                    <div class="grid grid-flow-row gap-5 flex-nowrap">
                        <p class="text-lg text-azul-text">Nível de incidência por sala/laboratório</p>
                         {/* Graficos  */}
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            Laboratorio.forEach((Laboratorio)=> {
                                Lab
                                <div class="bg-azul-principal rounded-xl h-max">
                                    <p class="text-white text-base p-3 text-center">
                                        {Laboratorio.laboratorio}
                                    </p>
                                     {/* canvas  */}
                                    <div class="bg-white h-max rounded-b-xl flex flex-row justify-center items-center p-2 relative">
                                        <canvas id="{ Laboratorio.laboratorio }" class="w-max max-h-40"></canvas>
                                        <p class="text-azul-text text-xl absolute z-10">{Laboratorio.porcentagem_acessos}</p>
                                         {/* Script  */}
                                            document.addEventListener('DOMContentLoaded', function () {
                                                const ctx = document.getElementById('{ Laboratorio.laboratorio}').getContext('2d');

                                                new Chart(ctx, {
                                                    type: 'doughnut',
                                                    data: {
                                                        datasets: [{
                                                            label: 'Lab-{ Laboratorio.laboratorio }',
                                                            data: [100 - '{Laboratorio.porcentagem_acessos }', '{Laboratorio.porcentagem_acessos}'],
                                                            borderWidth: 1,
                                                            backgroundColor: [
                                                                '#DEE4F7',
                                                                '#F23A13',
                                                            ]
                                                        }]
                                                    },
                                                    options: {
                                                        plugins: {
                                                            legend: {
                                                                display: false // Oculta a legenda
                                                            },
                                                            tooltip: {
                                                                enabled: false // Desabilita as dicas de ferramentas
                                                            },
                                                        },
                                                        cutout: '65%' // Define a porcentagem de corte
                                                    }
                                                });
                                            });
                                    </div>
                                </div>
                                });                                                
                        </div>
                         {/* Tabelas  */}
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            <div class="flex flex-col">
                                <p class="text-azul-text text-base">Ativos Agora</p>
                                <div
                                    class="flex flex-col rounded-xl bg-white p-3 justify-center items-center text-center">
                                    <table class="text-azul-text text-base gap-5">
                                        <thead class="font-bold">
                                            <td class="px-3">Nome</td>
                                            <td class="px-3">Qtde. Disp.</td>
                                            <td class="px-3">Status</td>
                                        </thead>

                                        <tbody class="border-b gap-5 hover:bg-slate-200 cursor-pointer">
                                            <tr>
                                                <td class="px-3">Laboratório 01</td>
                                                <td class="px-3">35</td>
                                                <td class="px-3 flex flex-row items-center justify-center"><img
                                                        class="size-5" src="/icons/status-green.svg"/>
                                                </td>
                                            </tr>
                                            <tr class="border-b gap-5 hover:bg-slate-200 cursor-pointer">
                                                <td class="px-3">Laboratório 02</td>
                                                <td class="px-3">34</td>
                                                <td class="px-3 flex flex-row items-center justify-center"><img
                                                        class="size-5" src="/icons/status-green.svg"/>
                                                </td>
                                            </tr>
                                            <tr class="border-b gap-5 hover:bg-slate-200 cursor-pointer">
                                                <td class="px-3">Laboratório 03</td>
                                                <td class="px-3">20</td>
                                                <td class="px-3 flex flex-row items-center justify-center"><img
                                                        class="size-5" src="/icons/status-red.svg"/>
                                                </td>
                                            </tr>
                                            <tr class="border-b gap-5 hover:bg-slate-200 cursor-pointer">
                                                <td class="px-3">Laboratório 04</td>
                                                <td class="px-3">10</td>
                                                <td class="px-3 flex flex-row items-center justify-center"><img
                                                        class="size-5" src="/icons/status-red.svg"/>
                                                </td>
                                            </tr>
                                            <tr class="border-b gap-5 hover:bg-slate-200 cursor-pointer">
                                                <td class="px-3">Laboratório 05</td>
                                                <td class="px-3">16</td>
                                                <td class="px-3 flex flex-row items-center justify-center"><img
                                                        class="size-5" src="/icons/status-green.svg"/>
                                                </td>
                                            </tr>
                                            <tr class="border-b gap-5 hover:bg-slate-200 cursor-pointer">
                                                <td class="px-3">Laboratório 06</td>
                                                <td class="px-3">22</td>
                                                <td class="px-3 flex flex-row items-center justify-center"><img
                                                        class="size-5" src="/icons/status-green.svg"/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <img class="size-5" src="/icons/arrowDown.svg" alt=""/>
                                </div>
                            </div>
                            <div class="flex flex-col">
                                <p>Histórico por data</p>
                                <div
                                    class="flex flex-col rounded-xl bg-white p-3 justify-between items-center text-center w-full h-max">
                                    <div class="flex flex-row w-full items-center justify-evenly">
                                        <img class="cursor-pointer hover:scale-105 duration-300 size-4 rotate-90"
                                            src="/icons/arrowDown.svg" alt=""/>
                                        <p class="text-azul-text text-base font-bold">Fevereiro</p>
                                        <img class="cursor-pointer hover:scale-105 duration-300 size-4 -rotate-90"
                                            src="/icons/arrowDown.svg" alt=""/>
                                    </div>
                                    <div class="flex flex-col w-full h-full ">
                                        <table class="text-azul-text text-base w-full h-full flex flex-col">
                                            <thead class="font-bold ">
                                                <td class=" px-5 hover:bg-slate-200">D</td>
                                                <td class=" px-5 hover:bg-slate-200">S</td>
                                                <td class=" px-5 hover:bg-slate-200">T</td>
                                                <td class=" px-5 hover:bg-slate-200">Q</td>
                                                <td class=" px-5 hover:bg-slate-200">Q</td>
                                                <td class=" px-5 hover:bg-slate-200">S</td>
                                                <td class=" px-5 hover:bg-slate-200">S</td>
                                            </thead>
                                            <tbody class="border-b  cursor-pointer">
                                                <tr>
                                                    <td class="py-1 px-5opacity-75 hover:bg-slate-200">28</td>
                                                    <td class="py-1 px-5opacity-75 hover:bg-slate-200">29</td>
                                                    <td class="py-1 px-5opacity-75 hover:bg-slate-200">30</td>
                                                    <td class="py-1 px-5opacity-75 hover:bg-slate-200">31</td>
                                                    <td class="py-1 px-5 bg-azul-principal text-white">01</td>
                                                    <td class="py-1 px-5hover:bg-slate-200">02</td>
                                                    <td class="py-1 px-5hover:bg-slate-200">03</td>
                                                </tr>
                                                <tr class="border-b  cursor-pointer">
                                                    <td class="py-1 px-5hover:bg-slate-200">04</td>
                                                    <td class="py-1 px-5 bg-azul-principal text-white">05</td>
                                                    <td class="py-1 px-5hover:bg-slate-200">06</td>
                                                    <td class="py-1 px-5 bg-azul-principal text-white">07</td>
                                                    <td class="py-1 px-5 bg-azul-principal text-white">08</td>
                                                    <td class="py-1 px-5hover:bg-slate-200">09</td>
                                                    <td class="py-1 px-5hover:bg-slate-200">10</td>
                                                </tr>
                                                <tr class="border-b  cursor-pointer">
                                                    <td class="py-1 px-5hover:bg-slate-200">11</td>
                                                    <td class="py-1 px-5hover:bg-slate-200">12</td>
                                                    <td class="py-1 px-5 bg-azul-principal text-white">13</td>
                                                    <td class="py-1 px-5 bg-azul-principal text-white">14</td>
                                                    <td class="py-1 px-5hover:bg-slate-200">15</td>
                                                    <td class="py-1 px-5hover:bg-slate-200">16</td>
                                                    <td class="py-1 px-5 bg-azul-principal text-white">17</td>
                                                </tr>
                                                <tr class="border-b  cursor-pointer">
                                                    <td class="py-1 px-5hover:bg-slate-200">18</td>
                                                    <td class="py-1 px-5 bg-azul-principal text-white">19</td>
                                                    <td class="py-1 px-5hover:bg-slate-200">20</td>
                                                    <td class="py-1 px-5hover:bg-slate-200">21</td>
                                                    <td class="py-1 px-5hover:bg-slate-200">22</td>
                                                    <td class="py-1 px-5 bg-azul-principal text-white">23</td>
                                                    <td class="py-1 px-5hover:bg-slate-200">24</td>
                                                </tr>
                                                <tr class="border-b  cursor-pointer">
                                                    <td class="py-1 px-5hover:bg-slate-200 ">25</td>
                                                    <td class="py-1 px-5hover:bg-slate-200">26</td>
                                                    <td class="py-1 px-5hover:bg-slate-200">27</td>
                                                    <td class="py-1 px-5 bg-azul-principal text-white">28</td>
                                                    <td class="py-1 px-5hover:bg-slate-200">29</td>
                                                    <td class="py-1 px-5opacity-75 hover:bg-slate-200">01</td>
                                                    <td class="py-1 px-5opacity-75 hover:bg-slate-200">02</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                </section>
            </section>
        </section>
    </section>
    </>
)
                                                }