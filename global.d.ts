declare module "vue" {
  export interface GlobalComponents {
    UlMenu: typeof import("udesign-vue")["UlMenu"];
    UlForm: typeof import("udesign-vue")["UlForm"];
    UlTable: typeof import("udesign-vue")["UlTable"];
    UlRange: typeof import("udesign-vue")["UlRange"];
  }
}

export {};
