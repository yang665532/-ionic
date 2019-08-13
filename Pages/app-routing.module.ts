import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'list', loadChildren: './list/list.module#ListPageModule' },
  { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },
  { path: 'info', loadChildren: './info/info.module#InfoPageModule' },
  { path: 'faq', loadChildren: './faq/faq.module#FaqPageModule' },
  { path: 'help', loadChildren: './help/help.module#HelpPageModule' },
  { path: 'setting', loadChildren: './setting/setting.module#SettingPageModule' },
  { path: 'acup', loadChildren: './acup/acup.module#AcupPageModule' },
  { path: 'market', loadChildren: './market/market.module#MarketPageModule' },
  { path: 'course', loadChildren: './course/course.module#CoursePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
