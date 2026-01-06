const helper = {
  addThousandSeparator(num: number | string): string | number {
    if (num === 0) return 0;
    return num
      ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      : "-";
  },

  removeThousandSeparator(num: number | string): number | string {
    if (num === 0) return 0;
    if (num) {
      const clean = num.toString().replace(/\./g, "");
      return isNaN(Number(clean)) ? "" : Number(clean);
    }

    return "-";
  },

  formatCurrency(amount: number | string): string {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    if (isNaN(num)) return "Rp 0";
  
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  },

  isNullOrEmpty(input: any): boolean {
    return input === null 
      || input === "" 
      || input === undefined;
  },

  hasPermission(menu: string, action?: string): boolean {
    let permissions: string[] = [];
    try {
      const raw = localStorage.getItem("user");
      const user = raw ? JSON.parse(raw) : null;
      const p = user?.permission || user?.permissions;
      if (Array.isArray(p)) permissions = p;
    } catch {

    }
  
    if (!permissions.length) return false;
    if (permissions.includes("*")) return true;
  
    const need = action && action.trim()
      ? `${menu}.${action}` 
      : menu; 
  
    if (!need) return false;
  
    const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const toRegex = (pattern: string) =>
      new RegExp(
        "^" +
          pattern
            .split(".")
            .map(seg => (seg === "*" ? "[^.]+" : escapeRegex(seg)))
            .join("\\.") +
          "$"
      );
  
    const needRx = toRegex(need);
  
    return permissions.some(up => {
      if (up === "*") return true;
      const userRx = toRegex(up);
      return userRx.test(need) || needRx.test(up);
    });
  }
};

export default helper;
