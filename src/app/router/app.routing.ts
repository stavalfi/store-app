import {RouterModule} from "@angular/router";

export const appRouting = RouterModule.forRoot(
  [
    {
      path: 'shop',
      loadChildren: 'app/modules/shop.module#ShopModule'
    },
    {
      path: 'account/:key',
      loadChildren: 'app/modules/account.module#AccountModule'
    },
    {
      path: '',
      redirectTo: 'shop',
      pathMatch: 'full'
    },
  ]);
