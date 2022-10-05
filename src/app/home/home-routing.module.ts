import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'pacientes',
        loadChildren: () => import('../pacientes/pacientes.module').then(m => m.PacientesPageModule),
      },
      {
        path: 'realizar-lancamento',
        loadChildren: () => import('../realizar-lancamento/realizar-lancamento.module').then(m => m.RealizarLancamentoPageModule),
      },
      {
        path: 'resultado',
        loadChildren: () => import('../resultado/resultado.module').then(m => m.ResultadoPageModule),
      },
      {
        path: 'visualizar-historico',
        loadChildren: () => import('../visualizar-historico/visualizar-historico.module').then(m => m.VisualizarHistoricoPageModule),
      },
      {
        path: 'alterar-senha',
        loadChildren: () => import('../alterar-senha/alterar-senha.module').then(m => m.AlterarSenhaPageModule),
      },
      {
        path: 'historico',
        loadChildren: () => import('../historico/historico.module').then(m => m.HistoricoPageModule),
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
