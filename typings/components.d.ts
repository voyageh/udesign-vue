declare module "vue" {
  // GlobalComponents for Volar
  export interface GlobalComponents {
    UlMenu: typeof import("../packages/udesign-vue")["UlMenu"];
    UlForm: typeof import("../packages/udesign-vue")["UlForm"];
    UlTable: typeof import("../packages/udesign-vue")["UlTable"];
  }
}

export {};
