"use client";

import { RiCheckLine } from "react-icons/ri";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

type BadgeVariant = "default" | "secondary" | "muted" | "destructive";
type BadgeSize = "sm" | "md" | "lg";
type ButtonVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link";
type ButtonSize = "sm" | "md" | "lg" | "icon" | "icon-sm" | "icon-lg";

export default function ComponentsPage() {
  const badgeVariants: BadgeVariant[] = [
    "default",
    "secondary",
    "muted",
    "destructive",
  ];
  const badgeSizes: BadgeSize[] = ["sm", "md", "lg"];
  const buttonVariants: ButtonVariant[] = [
    "default",
    "secondary",
    "outline",
    "ghost",
    "destructive",
    "link",
  ];
  const buttonSizes: ButtonSize[] = [
    "sm",
    "md",
    "lg",
    "icon",
    "icon-sm",
    "icon-lg",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2">Component Library</h1>
        <p className="text-muted-foreground mb-12">
          Development-only showcase of reusable components
        </p>

        {/* Badge Component Section */}
        <Card className="mb-8">
          <CardHeader title="Badge Component" subtitle="Variants & Sizes" />
          <CardContent>
            <div className="space-y-6">
              {badgeVariants.map((variant) => (
                <div key={variant}>
                  <p className="text-sm text-muted-foreground mb-3 capitalize font-medium">
                    {variant} variant:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {badgeSizes.map((size) => (
                      <div key={`${variant}-${size}`} className="flex gap-2">
                        <Badge variant={variant} size={size}>
                          {size}
                        </Badge>
                        <Badge
                          variant={variant}
                          size={size}
                          icon={<RiCheckLine size={14} />}
                        >
                          {size}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Button Component Section */}
        <Card className="mb-8">
          <CardHeader title="Button Component" subtitle="Variants & Sizes" />
          <CardContent>
            <div className="space-y-6">
              {buttonVariants.map((variant) => (
                <div key={variant}>
                  <p className="text-sm text-muted-foreground mb-3 capitalize font-medium">
                    {variant} variant:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {buttonSizes.map((size) => (
                      <Button
                        key={`${variant}-${size}`}
                        variant={variant}
                        size={size}
                      >
                        {size === "icon" ||
                        size === "icon-sm" ||
                        size === "icon-lg" ? (
                          <RiCheckLine size={20} />
                        ) : (
                          size
                        )}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Card Component Section */}
        <Card className="mb-8">
          <CardHeader title="Card Component" subtitle="Layout Examples" />
          <CardContent>
            <div className="space-y-6">
              {/* Card with Header */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  Card with header:
                </p>
                <Card>
                  <CardHeader title="Card Title" subtitle="Optional subtitle" />
                  <CardContent>
                    <p>
                      This is card content. Cards can have headers and are
                      useful for grouping related information.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Card without Header */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  Card without header:
                </p>
                <Card>
                  <CardContent>
                    <p>
                      This card has no header. Headers are optional, so you can
                      use cards for simple content grouping.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Card with Mixed Content */}
              <div>
                <p className="text-sm text-muted-foreground mb-3">
                  Card with mixed content:
                </p>
                <Card>
                  <CardHeader title="Example Project" />
                  <CardContent>
                    <p className="mb-4">
                      A project showcasing component organization and reusable
                      UI patterns.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" size="sm">
                        React
                      </Badge>
                      <Badge variant="secondary" size="sm">
                        TypeScript
                      </Badge>
                      <Badge variant="secondary" size="sm">
                        Tailwind CSS
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="default" size="sm">
                        Visit
                      </Button>
                      <Button variant="outline" size="sm">
                        View Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ThemeToggle Component Section */}
        <Card className="mb-8">
          <CardHeader title="ThemeToggle Component" subtitle="Theme Switcher" />
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Click the button below to toggle between light and dark themes:
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-border rounded-md flex items-center justify-center">
                  <ThemeToggle />
                </div>
                <p className="text-sm text-muted-foreground">
                  Theme Toggle Button
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
