"use client";

import { useState } from "react";
import { RiCheckLine } from "react-icons/ri";
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
type ButtonDisplayMode = "text" | "icon" | "both";

function ControlButton({
  isActive,
  onClick,
  children,
}: {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Button
      onClick={onClick}
      variant={isActive ? "default" : "outline"}
      size="sm"
    >
      {children}
    </Button>
  );
}

export default function ComponentsPage() {
  const [badgeVariant, setBadgeVariant] = useState<BadgeVariant>("default");
  const [badgeSize, setBadgeSize] = useState<BadgeSize>("md");
  const [badgeWithIcon, setBadgeWithIcon] = useState(false);

  const [buttonVariant, setButtonVariant] = useState<ButtonVariant>("default");
  const [buttonSize, setButtonSize] = useState<ButtonSize>("md");
  const [buttonDisplayMode, setButtonDisplayMode] =
    useState<ButtonDisplayMode>("both");
  const [buttonDisabled, setButtonDisabled] = useState(false);

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
  const buttonDisplayModes: ButtonDisplayMode[] = ["text", "icon", "both"];

  const getButtonContent = () => {
    switch (buttonDisplayMode) {
      case "text":
        return "Click me";
      case "icon":
        return <RiCheckLine size={20} />;
      case "both":
        return (
          <>
            <RiCheckLine size={20} />
            Click me
          </>
        );
    }
  };

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
              {/* Badge Variant Selector */}
              <div>
                <p className="block text-sm font-medium mb-3">Variant</p>
                <div className="flex flex-wrap gap-2">
                  {badgeVariants.map((variant) => (
                    <ControlButton
                      key={variant}
                      isActive={badgeVariant === variant}
                      onClick={() => setBadgeVariant(variant)}
                    >
                      {variant}
                    </ControlButton>
                  ))}
                </div>
              </div>

              {/* Badge Size Selector */}
              <div>
                <p className="block text-sm font-medium mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {badgeSizes.map((size) => (
                    <ControlButton
                      key={size}
                      isActive={badgeSize === size}
                      onClick={() => setBadgeSize(size)}
                    >
                      {size}
                    </ControlButton>
                  ))}
                </div>
              </div>

              {/* Badge Icon Toggle */}
              <div>
                <label
                  htmlFor="badge-icon"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    id="badge-icon"
                    type="checkbox"
                    checked={badgeWithIcon}
                    onChange={(e) => setBadgeWithIcon(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Show with icon</span>
                </label>
              </div>

              {/* Badge Preview */}
              <div className="border-t border-border pt-6">
                <p className="text-sm text-muted-foreground mb-4">Preview:</p>
                <div className="flex flex-wrap gap-4">
                  <Badge
                    variant={badgeVariant}
                    size={badgeSize}
                    icon={badgeWithIcon ? <RiCheckLine size={16} /> : undefined}
                  >
                    {badgeWithIcon ? "Verified" : "Badge"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Button Component Section */}
        <Card className="mb-8">
          <CardHeader title="Button Component" subtitle="Variants & Sizes" />
          <CardContent>
            <div className="space-y-6">
              {/* Button Variant Selector */}
              <div>
                <p className="block text-sm font-medium mb-3">Variant</p>
                <div className="flex flex-wrap gap-2">
                  {buttonVariants.map((variant) => (
                    <ControlButton
                      key={variant}
                      isActive={buttonVariant === variant}
                      onClick={() => setButtonVariant(variant)}
                    >
                      {variant}
                    </ControlButton>
                  ))}
                </div>
              </div>

              {/* Button Size Selector */}
              <div>
                <p className="block text-sm font-medium mb-3">Size</p>
                <div className="flex flex-wrap gap-2">
                  {buttonSizes.map((size) => (
                    <ControlButton
                      key={size}
                      isActive={buttonSize === size}
                      onClick={() => setButtonSize(size)}
                    >
                      {size}
                    </ControlButton>
                  ))}
                </div>
              </div>

              {/* Button Display Mode Selector */}
              <div>
                <p className="block text-sm font-medium mb-3">Content</p>
                <div className="flex flex-wrap gap-2">
                  {buttonDisplayModes.map((mode) => (
                    <ControlButton
                      key={mode}
                      isActive={buttonDisplayMode === mode}
                      onClick={() => setButtonDisplayMode(mode)}
                    >
                      {mode}
                    </ControlButton>
                  ))}
                </div>
              </div>

              {/* Button Disabled Toggle */}
              <div>
                <label
                  htmlFor="button-disabled"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    id="button-disabled"
                    type="checkbox"
                    checked={buttonDisabled}
                    onChange={(e) => setButtonDisabled(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Disabled state</span>
                </label>
              </div>

              {/* Button Preview */}
              <div className="border-t border-border pt-6">
                <p className="text-sm text-muted-foreground mb-4">Preview:</p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant={buttonVariant}
                    size={buttonSize}
                    disabled={buttonDisabled}
                  >
                    {getButtonContent()}
                  </Button>
                </div>
              </div>
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

        {/* All Variants Grid */}
        <Card>
          <CardHeader
            title="All Badge Variants"
            subtitle="Complete Reference"
          />
          <CardContent>
            <div className="space-y-6">
              {badgeVariants.map((variant) => (
                <div key={variant}>
                  <p className="text-sm text-muted-foreground mb-2 capitalize">
                    {variant} variant:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {badgeSizes.map((size) => (
                      <div key={size} className="flex gap-2">
                        <Badge variant={variant as BadgeVariant} size={size}>
                          {size}
                        </Badge>
                        <Badge
                          variant={variant as BadgeVariant}
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
      </div>
    </div>
  );
}
