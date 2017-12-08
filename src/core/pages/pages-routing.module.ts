import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
    {
        path: '', component: PagesComponent,
        children: [
            { path: '', loadChildren: './home/home.module#HomeModule' },
            { path: 'viewer', loadChildren: './viewer/viewer.module#ViewerModule' },
            { path: 'about', loadChildren: './about/about.module#AboutModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }