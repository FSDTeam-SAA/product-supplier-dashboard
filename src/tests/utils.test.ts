import { cn } from "@/lib/utils";

describe("Utility functions", () => {
  it("cn merges class names properly", () => {
    const result = cn("text-red-500", "bg-blue-500");
    expect(result).toContain("text-red-500");
    expect(result).toContain("bg-blue-500");
  });

  it("cn handles conditional class names correctly", () => {
    const isActive = true;
    const isHidden = false;
    const result = cn("base-class", isActive && "active-class", isHidden && "hidden-class");
    expect(result).toBe("base-class active-class");
  });
});
