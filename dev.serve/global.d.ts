declare global{
    const rxjs:any;
    const Deno:any;
    interface Window { rxjs: any; }
    interface console { success: Function }
}
