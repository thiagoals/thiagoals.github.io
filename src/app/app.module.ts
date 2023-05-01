import { SidebarComponent } from './admin/shared/menu/sidebar/sidebar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { TopNavBarComponent } from './admin/shared/menu/top-nav-bar/top-nav-bar.component';
import { FontAwesomeDirective } from 'ng2-fontawesome';
import { Footer } from './admin/shared/footer/footer.component';
import { NetworkActivitiesComponent } from './admin/shared/content/network-activities/network-activities.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { LoginClient } from 'src/client/login.client';
import { MyAppliancesClient } from 'src/client/role_client/my-appliances.client';
import { DocumentsClient } from 'src/client/documents.client';
import { MyClientsClient } from 'src/client/role_client/my-clients.client';
import { AddClientClient } from 'src/client/role_client/add-client.client';
import { ClientsClient } from 'src/client/clients.client';
import { AddApplianceClient } from 'src/client/role_client/add-appliance';
import { DocumentTypesClient } from 'src/client/document-types.client';
import { GetApplianceClient } from 'src/client/get-appliance.client';
import { GetAppliancesClient } from 'src/client/get-appliances.client';
import { EditApplianceClient } from 'src/client/edit-appliance.client';
import { GetApplianceTypesClient } from 'src/client/get-appliance-types.client';
import { GetAllClientsClient } from 'src/client/role_secretary/get-all-clients.client';

import { HomeComponent } from './admin/home/home.component';
import { LoginComponent } from './login/login.component';
import { ContentComponent } from './admin/shared/content/content.component';
import { NoContentComponent } from './admin/shared/global/no-content/no-content.component';
import { MinhasAplicacoesComponent } from './admin/home/role_client/minhas-aplicacoes/minhas-aplicacoes.component';
import { AplicacoesComponent } from './admin/home/role_secretary/aplicacoes/aplicacoes.component';

import {LOCALE_ID} from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';
import { DocumentosComponent } from './admin/home/role_client/documentos/documentos.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { CurrencyMaskModule } from "ngx-currency-mask";
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

import { MeusClientesComponent } from './admin/home/role_client/meus-clientes/meus-clientes.component';
import { AdicionarClienteComponent } from './admin/home/role_client/adicionar-cliente/adicionar-cliente.component';
import { AdicionarAplicacaoComponent } from './admin/home/role_client/adicionar-aplicacao/adicionar-aplicacao.component';
import { AddDocumentClient } from 'src/client/role_client/add-document.client';
import { GetDocumentClient } from 'src/client/get-document.client';
import { AlterarAplicacaoComponent } from './admin/home/role_client/alterar-aplicacao/alterar-aplicacao.component';
import { ClientesComponent } from './admin/home/role_secretary/clientes/clientes.component';
import { SerasaComponent } from './admin/home/role_secretary/serasa/serasa.component';
import { AdicionarSerasaComponent } from './admin/home/role_secretary/adicionar-serasa/adicionar-serasa.component';
import { AdicionarUsuarioComponent } from './admin/home/role_secretary/adicionar-usuario/adicionar-usuario.component';
import { AddUserClient } from 'src/client/role_secretary/add-user.client';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


export const AppRoutes2: Routes = [
  /*{ path: 'inbox',  component: Inbox },
  { path: 'about', component: About },*/
  { 
    path: 'admin', 
    component: HomeComponent, 
    children: [
      // ALL
      {
        path: '',
        component: ContentComponent
      },
      // CLIENT
      {
        path: 'minhas-aplicacoes/:page/:item',
        component: MinhasAplicacoesComponent
      },
      {
        path: 'minhas-aplicacoes/adicionar',
        component: AdicionarAplicacaoComponent
      },
      {
        path: 'minhas-aplicacoes/editar/:applianceId',
        component: AlterarAplicacaoComponent
      },
      {
        path: 'meus-clientes',
        component: MeusClientesComponent
      },
      {
        path: 'meus-clientes/adicionar',
        component: AdicionarClienteComponent
      },
      {
        path: 'documentos/:applianceId',
        component: DocumentosComponent
      },
      // ADMIN  
      // SECRETARY
      {
        path: 'aplicacoes/:page/:item',
        component: AplicacoesComponent
      },
      {
        path: 'usuarios',
        component: ClientesComponent
      },
      {
        path: 'usuarios/adicionar',
        component: AdicionarUsuarioComponent
      },
      {
        path: 'serasa/:page/:item',
        component: SerasaComponent
      },
      {
        path: 'serasa/adicionar',
        component: AdicionarSerasaComponent
      },
      // OTHERS
      {
        path:'**',
        component: NoContentComponent
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent }
];

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopNavBarComponent,
    Footer,
    NetworkActivitiesComponent,
    LoginComponent,
    HomeComponent,
    ContentComponent,
    NoContentComponent,
    MinhasAplicacoesComponent,
    AplicacoesComponent,
    DocumentosComponent,
    SpinnerComponent,
    MeusClientesComponent,
    AdicionarClienteComponent,
    AdicionarAplicacaoComponent,
    AlterarAplicacaoComponent,
    ClientesComponent,
    SerasaComponent,
    AdicionarSerasaComponent,
    AdicionarUsuarioComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes2, { useHash: false }), 
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule, 
    NgxSpinnerModule, 
    ToastrModule.forRoot(),
    CurrencyMaskModule, 
    ServiceWorkerModule.register('ngsw-worker.js',{ 
        enabled: environment.production, 
        registrationStrategy: 'registerImmediately' 
      })],
  providers: [
    LoginClient, 
    MyAppliancesClient,
    DocumentsClient,
    MyClientsClient,
    AddClientClient,
    ClientsClient,
    AddApplianceClient,
    DocumentTypesClient,
    AddDocumentClient,
    GetDocumentClient,
    GetApplianceClient,
    GetAppliancesClient,
    EditApplianceClient,
    GetApplianceTypesClient,
    GetAllClientsClient,
    AddUserClient,
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }
],
  bootstrap: [AppComponent]
})
export class AppModule {}
