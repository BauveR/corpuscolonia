/**
 * Utilidad simple para combinar clases CSS
 * Similar a clsx/classnames pero sin dependencias externas
 */

type ClassValue = string | number | boolean | undefined | null | ClassValue[];

export function cn(...classes: ClassValue[]): string {
  return classes
    .flat()
    .filter((c): c is string | number => {
      if (typeof c === "string") return c.length > 0;
      if (typeof c === "number") return true;
      return false;
    })
    .join(" ")
    .trim();
}
