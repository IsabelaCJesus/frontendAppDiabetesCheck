import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
 // redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';

//const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    //...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: '',
    loadChildren: () =>
    import('./inicio/inicio.module').then((m) => m.InicioPageModule),
  },
  {
    path: 'realizar-lancamento',
    loadChildren: () => import('./realizar-lancamento/realizar-lancamento.module').then( m => m.RealizarLancamentoPageModule),
    //...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'home-admin',
    loadChildren: () => import('./home-admin/home-admin.module').then( m => m.HomeAdminPageModule),
    //...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'criar-conta',
    loadChildren: () => import('./criar-conta/criar-conta.module').then( m => m.CriarContaPageModule)
  },
  {
    path: 'pacientes',
    loadChildren: () => import('./pacientes/pacientes.module').then( m => m.PacientesPageModule)
  },
  {
    path: 'modal-paciente',
    loadChildren: () => import('./modal-paciente/modal-paciente.module').then( m => m.ModalPacientePageModule)
  },
  {
    path: 'resultado',
    loadChildren: () => import('./resultado/resultado.module').then( m => m.ResultadoPageModule)
  },
  {
    path: 'visualizar-historico',
    loadChildren: () => import('./visualizar-historico/visualizar-historico.module').then( m => m.VisualizarHistoricoPageModule)
  },
  {
    path: 'modal-lancamento',
    loadChildren: () => import('./modal-lancamento/modal-lancamento.module').then( m => m.ModalLancamentoPageModule)
  },
  {
    path: 'alterar-senha',
    loadChildren: () => import('./alterar-senha/alterar-senha.module').then( m => m.AlterarSenhaPageModule)
  },
  {
    path: 'relatorio-por-data',
    loadChildren: () => import('./relatorio-por-data/relatorio-por-data.module').then( m => m.RelatorioPorDataPageModule)
  },  {
    path: 'recuperar-senha',
    loadChildren: () => import('./recuperar-senha/recuperar-senha.module').then( m => m.RecuperarSenhaPageModule)
  },
  {
    path: 'ativar-users',
    loadChildren: () => import('./ativar-users/ativar-users.module').then( m => m.AtivarUsersPageModule)
  },
  {
    path: 'historico',
    loadChildren: () => import('./historico/historico.module').then( m => m.HistoricoPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }







