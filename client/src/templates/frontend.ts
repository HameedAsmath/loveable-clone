// export const template = {
//   "package.json": {
//     file: {
//       contents: JSON.stringify(
//         {
//           name: "react-vite-shadcn",
//           private: true,
//           version: "0.0.0",
//           type: "module",
//           scripts: {
//             dev: "vite --port 3000 --host",
//             build: "vite build",
//             preview: "vite preview",
//           },
//           dependencies: {
//             "react": "^18.2.0",
//             "react-dom": "^18.2.0",
//             "react-router-dom": "^6.22.0",
//             "class-variance-authority": "^0.7.0",
//             "clsx": "^2.1.0",
//             "tailwind-merge": "^2.2.0",
//             "lucide-react": "^0.379.0",
//             "recharts": "^2.12.0",
//             "@radix-ui/react-slot": "^1.0.2",
//             "@radix-ui/react-accordion": "^1.1.2",
//             "@radix-ui/react-alert-dialog": "^1.0.5",
//             "@radix-ui/react-avatar": "^1.0.4",
//             "@radix-ui/react-checkbox": "^1.0.4",
//             "@radix-ui/react-dialog": "^1.0.5",
//             "@radix-ui/react-dropdown-menu": "^2.0.6",
//             "@radix-ui/react-label": "^2.0.2",
//             "@radix-ui/react-popover": "^1.0.7",
//             "@radix-ui/react-progress": "^1.0.3",
//             "@radix-ui/react-radio-group": "^1.1.3",
//             "@radix-ui/react-scroll-area": "^1.0.5",
//             "@radix-ui/react-select": "^2.0.0",
//             "@radix-ui/react-separator": "^1.0.3",
//             "@radix-ui/react-slider": "^1.1.2",
//             "@radix-ui/react-switch": "^1.0.3",
//             "@radix-ui/react-tabs": "^1.0.4",
//             "@radix-ui/react-toast": "^1.1.5",
//             "@radix-ui/react-toggle": "^1.0.3",
//             "@radix-ui/react-tooltip": "^1.0.7",
//           },
//           devDependencies: {
//             "@vitejs/plugin-react": "^4.2.0",
//             "autoprefixer": "^10.4.17",
//             "postcss": "^8.4.35",
//             "tailwindcss": "^3.4.0",
//             "vite": "^5.0.0"
//           },
//         },
//         null,
//         2,
//       ),
//     },
//   },

//   "index.html": {
//     file: {
//       contents: `<!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>App</title>
//   </head>
//   <body>
//     <div id="root"></div>
//     <script type="module" src="/src/main.jsx"></script>
//   </body>
// </html>
// `,
//     },
//   },

//   "vite.config.js": {
//     file: {
//       contents: `import { defineConfig } from "vite"
// import react from "@vitejs/plugin-react"
// import path from "path"

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },
// })
// `,
//     },
//   },

//   "tailwind.config.js": {
//     file: {
//       contents: `/** @type {import('tailwindcss').Config} */
// export default {
//   darkMode: ["class"],
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     container: {
//       center: true,
//       padding: "2rem",
//       screens: {
//         "2xl": "1400px",
//       },
//     },
//     extend: {
//       colors: {
//         border: "hsl(var(--border))",
//         input: "hsl(var(--input))",
//         ring: "hsl(var(--ring))",
//         background: "hsl(var(--background))",
//         foreground: "hsl(var(--foreground))",
//         primary: {
//           DEFAULT: "hsl(var(--primary))",
//           foreground: "hsl(var(--primary-foreground))",
//         },
//         secondary: {
//           DEFAULT: "hsl(var(--secondary))",
//           foreground: "hsl(var(--secondary-foreground))",
//         },
//         destructive: {
//           DEFAULT: "hsl(var(--destructive))",
//           foreground: "hsl(var(--destructive-foreground))",
//         },
//         muted: {
//           DEFAULT: "hsl(var(--muted))",
//           foreground: "hsl(var(--muted-foreground))",
//         },
//         accent: {
//           DEFAULT: "hsl(var(--accent))",
//           foreground: "hsl(var(--accent-foreground))",
//         },
//         popover: {
//           DEFAULT: "hsl(var(--popover))",
//           foreground: "hsl(var(--popover-foreground))",
//         },
//         card: {
//           DEFAULT: "hsl(var(--card))",
//           foreground: "hsl(var(--card-foreground))",
//         },
//       },
//       borderRadius: {
//         lg: "var(--radius)",
//         md: "calc(var(--radius) - 2px)",
//         sm: "calc(var(--radius) - 4px)",
//       },
//       keyframes: {
//         "accordion-down": {
//           from: { height: "0" },
//           to: { height: "var(--radix-accordion-content-height)" },
//         },
//         "accordion-up": {
//           from: { height: "var(--radix-accordion-content-height)" },
//           to: { height: "0" },
//         },
//       },
//       animation: {
//         "accordion-down": "accordion-down 0.2s ease-out",
//         "accordion-up": "accordion-up 0.2s ease-out",
//       },
//     },
//   },
//   plugins: [],
// }
// `,
//     },
//   },

//   "postcss.config.js": {
//     file: {
//       contents: `export default {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }
// `,
//     },
//   },

//   "components.json": {
//     file: {
//       contents: JSON.stringify(
//         {
//           $schema: "https://ui.shadcn.com/schema.json",
//           style: "default",
//           rsc: false,
//           tsx: false,
//           tailwind: {
//             config: "tailwind.config.js",
//             css: "src/index.css",
//             baseColor: "slate",
//             cssVariables: true,
//           },
//           aliases: {
//             components: "@/components",
//             utils: "@/lib/utils",
//           },
//         },
//         null,
//         2,
//       ),
//     },
//   },

//   src: {
//     directory: {
//       "main.jsx": {
//         file: {
//           contents: `import React from "react"
// import ReactDOM from "react-dom/client"
// import App from "./App.jsx"
// import "./index.css"

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
// `,
//         },
//       },

//       "App.jsx": {
//         file: {
//           contents: `import React from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// export default function App() {
//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center p-8">
//       <Card className="w-full max-w-md">
//         <CardHeader>
//           <CardTitle>React + Vite + shadcn/ui</CardTitle>
//         </CardHeader>
//         <CardContent className="flex flex-col gap-4">
//           <p className="text-muted-foreground text-sm">
//             Your app is ready. Start editing App.jsx.
//           </p>
//           <Button>Get Started</Button>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
// `,
//         },
//       },

//       "index.css": {
//         file: {
//           contents: `@tailwind base;
// @tailwind components;
// @tailwind utilities;

// @layer base {
//   :root {
//     --background: 0 0% 100%;
//     --foreground: 222.2 84% 4.9%;
//     --card: 0 0% 100%;
//     --card-foreground: 222.2 84% 4.9%;
//     --popover: 0 0% 100%;
//     --popover-foreground: 222.2 84% 4.9%;
//     --primary: 221.2 83.2% 53.3%;
//     --primary-foreground: 210 40% 98%;
//     --secondary: 210 40% 96.1%;
//     --secondary-foreground: 222.2 47.4% 11.2%;
//     --muted: 210 40% 96.1%;
//     --muted-foreground: 215.4 16.3% 46.9%;
//     --accent: 210 40% 96.1%;
//     --accent-foreground: 222.2 47.4% 11.2%;
//     --destructive: 0 84.2% 60.2%;
//     --destructive-foreground: 210 40% 98%;
//     --border: 214.3 31.8% 91.4%;
//     --input: 214.3 31.8% 91.4%;
//     --ring: 221.2 83.2% 53.3%;
//     --radius: 0.5rem;
//   }

//   .dark {
//     --background: 222.2 84% 4.9%;
//     --foreground: 210 40% 98%;
//     --card: 222.2 84% 4.9%;
//     --card-foreground: 210 40% 98%;
//     --popover: 222.2 84% 4.9%;
//     --popover-foreground: 210 40% 98%;
//     --primary: 217.2 91.2% 59.8%;
//     --primary-foreground: 222.2 47.4% 11.2%;
//     --secondary: 217.2 32.6% 17.5%;
//     --secondary-foreground: 210 40% 98%;
//     --muted: 217.2 32.6% 17.5%;
//     --muted-foreground: 215 20.2% 65.1%;
//     --accent: 217.2 32.6% 17.5%;
//     --accent-foreground: 210 40% 98%;
//     --destructive: 0 62.8% 30.6%;
//     --destructive-foreground: 210 40% 98%;
//     --border: 217.2 32.6% 17.5%;
//     --input: 217.2 32.6% 17.5%;
//     --ring: 224.3 76.3% 48%;
//   }
// }

// @layer base {
//   * {
//     @apply border-border;
//   }
//   body {
//     @apply bg-background text-foreground;
//   }
// }
// `,
//         },
//       },

//       lib: {
//         directory: {
//           "utils.js": {
//             file: {
//               contents: `import { clsx } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs) {
//   return twMerge(clsx(inputs))
// }
// `,
//             },
//           },
//         },
//       },

//       components: {
//         directory: {
//           ui: {
//             directory: {
//               "button.jsx": {
//                 file: {
//                   contents: `import * as React from "react"
// import { Slot } from "@radix-ui/react-slot"
// import { cva } from "class-variance-authority"
// import { cn } from "@/lib/utils"

// const buttonVariants = cva(
//   "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
//   {
//     variants: {
//       variant: {
//         default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
//         destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
//         outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
//         secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
//         ghost: "hover:bg-accent hover:text-accent-foreground",
//         link: "text-primary underline-offset-4 hover:underline",
//       },
//       size: {
//         default: "h-9 px-4 py-2",
//         sm: "h-8 rounded-md px-3 text-xs",
//         lg: "h-10 rounded-md px-8",
//         icon: "h-9 w-9",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// )

// const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
//   const Comp = asChild ? Slot : "button"
//   return (
//     <Comp
//       className={cn(buttonVariants({ variant, size, className }))}
//       ref={ref}
//       {...props}
//     />
//   )
// })
// Button.displayName = "Button"

// export { Button, buttonVariants }
// `,
//                 },
//               },

//               "card.jsx": {
//                 file: {
//                   contents: `import * as React from "react"
// import { cn } from "@/lib/utils"

// const Card = React.forwardRef(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn("rounded-xl border bg-card text-card-foreground shadow", className)}
//     {...props}
//   />
// ))
// Card.displayName = "Card"

// const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn("flex flex-col space-y-1.5 p-6", className)}
//     {...props}
//   />
// ))
// CardHeader.displayName = "CardHeader"

// const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn("font-semibold leading-none tracking-tight", className)}
//     {...props}
//   />
// ))
// CardTitle.displayName = "CardTitle"

// const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn("text-sm text-muted-foreground", className)}
//     {...props}
//   />
// ))
// CardDescription.displayName = "CardDescription"

// const CardContent = React.forwardRef(({ className, ...props }, ref) => (
//   <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
// ))
// CardContent.displayName = "CardContent"

// const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn("flex items-center p-6 pt-0", className)}
//     {...props}
//   />
// ))
// CardFooter.displayName = "CardFooter"

// export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
// `,
//                 },
//               },

//               "badge.jsx": {
//                 file: {
//                   contents: `import * as React from "react"
// import { cva } from "class-variance-authority"
// import { cn } from "@/lib/utils"

// const badgeVariants = cva(
//   "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
//   {
//     variants: {
//       variant: {
//         default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
//         secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
//         destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
//         outline: "text-foreground",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   }
// )

// function Badge({ className, variant, ...props }) {
//   return (
//     <div className={cn(badgeVariants({ variant }), className)} {...props} />
//   )
// }

// export { Badge, badgeVariants }
// `,
//                 },
//               },

//               "input.jsx": {
//                 file: {
//                   contents: `import * as React from "react"
// import { cn } from "@/lib/utils"

// const Input = React.forwardRef(({ className, type, ...props }, ref) => {
//   return (
//     <input
//       type={type}
//       className={cn(
//         "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
//         className
//       )}
//       ref={ref}
//       {...props}
//     />
//   )
// })
// Input.displayName = "Input"

// export { Input }
// `,
//                 },
//               },

//               "label.jsx": {
//                 file: {
//                   contents: `import * as React from "react"
// import * as LabelPrimitive from "@radix-ui/react-label"
// import { cva } from "class-variance-authority"
// import { cn } from "@/lib/utils"

// const labelVariants = cva(
//   "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
// )

// const Label = React.forwardRef(({ className, ...props }, ref) => (
//   <LabelPrimitive.Root
//     ref={ref}
//     className={cn(labelVariants(), className)}
//     {...props}
//   />
// ))
// Label.displayName = LabelPrimitive.Root.displayName

// export { Label }
// `,
//                 },
//               },

//               "separator.jsx": {
//                 file: {
//                   contents: `import * as React from "react"
// import * as SeparatorPrimitive from "@radix-ui/react-separator"
// import { cn } from "@/lib/utils"

// const Separator = React.forwardRef(
//   ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
//     <SeparatorPrimitive.Root
//       ref={ref}
//       decorative={decorative}
//       orientation={orientation}
//       className={cn(
//         "shrink-0 bg-border",
//         orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
//         className
//       )}
//       {...props}
//     />
//   )
// )
// Separator.displayName = SeparatorPrimitive.Root.displayName

// export { Separator }
// `,
//                 },
//               },

//               "tabs.jsx": {
//                 file: {
//                   contents: `import * as React from "react"
// import * as TabsPrimitive from "@radix-ui/react-tabs"
// import { cn } from "@/lib/utils"

// const Tabs = TabsPrimitive.Root

// const TabsList = React.forwardRef(({ className, ...props }, ref) => (
//   <TabsPrimitive.List
//     ref={ref}
//     className={cn(
//       "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
//       className
//     )}
//     {...props}
//   />
// ))
// TabsList.displayName = TabsPrimitive.List.displayName

// const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
//   <TabsPrimitive.Trigger
//     ref={ref}
//     className={cn(
//       "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
//       className
//     )}
//     {...props}
//   />
// ))
// TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

// const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
//   <TabsPrimitive.Content
//     ref={ref}
//     className={cn(
//       "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
//       className
//     )}
//     {...props}
//   />
// ))
// TabsContent.displayName = TabsPrimitive.Content.displayName

// export { Tabs, TabsList, TabsTrigger, TabsContent }
// `,
//                 },
//               },

//               "select.jsx": {
//                 file: {
//                   contents: `import * as React from "react"
// import * as SelectPrimitive from "@radix-ui/react-select"
// import { Check, ChevronDown, ChevronUp } from "lucide-react"
// import { cn } from "@/lib/utils"

// const Select = SelectPrimitive.Root
// const SelectGroup = SelectPrimitive.Group
// const SelectValue = SelectPrimitive.Value

// const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
//   <SelectPrimitive.Trigger
//     ref={ref}
//     className={cn(
//       "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
//       className
//     )}
//     {...props}
//   >
//     {children}
//     <SelectPrimitive.Icon asChild>
//       <ChevronDown className="h-4 w-4 opacity-50" />
//     </SelectPrimitive.Icon>
//   </SelectPrimitive.Trigger>
// ))
// SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

// const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => (
//   <SelectPrimitive.Portal>
//     <SelectPrimitive.Content
//       ref={ref}
//       className={cn(
//         "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
//         position === "popper" &&
//           "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
//         className
//       )}
//       position={position}
//       {...props}
//     >
//       <SelectPrimitive.Viewport
//         className={cn(
//           "p-1",
//           position === "popper" &&
//             "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
//         )}
//       >
//         {children}
//       </SelectPrimitive.Viewport>
//     </SelectPrimitive.Content>
//   </SelectPrimitive.Portal>
// ))
// SelectContent.displayName = SelectPrimitive.Content.displayName

// const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
//   <SelectPrimitive.Item
//     ref={ref}
//     className={cn(
//       "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
//       className
//     )}
//     {...props}
//   >
//     <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
//       <SelectPrimitive.ItemIndicator>
//         <Check className="h-4 w-4" />
//       </SelectPrimitive.ItemIndicator>
//     </span>
//     <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
//   </SelectPrimitive.Item>
// ))
// SelectItem.displayName = SelectPrimitive.Item.displayName

// const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
//   <SelectPrimitive.Label
//     ref={ref}
//     className={cn("px-2 py-1.5 text-sm font-semibold", className)}
//     {...props}
//   />
// ))
// SelectLabel.displayName = SelectPrimitive.Label.displayName

// const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
//   <SelectPrimitive.Separator
//     ref={ref}
//     className={cn("-mx-1 my-1 h-px bg-muted", className)}
//     {...props}
//   />
// ))
// SelectSeparator.displayName = SelectPrimitive.Separator.displayName

// export {
//   Select,
//   SelectGroup,
//   SelectValue,
//   SelectTrigger,
//   SelectContent,
//   SelectLabel,
//   SelectItem,
//   SelectSeparator,
// }
// `,
//                 },
//               },

//               "avatar.jsx": {
//                 file: {
//                   contents: `import * as React from "react"
// import * as AvatarPrimitive from "@radix-ui/react-avatar"
// import { cn } from "@/lib/utils"

// const Avatar = React.forwardRef(({ className, ...props }, ref) => (
//   <AvatarPrimitive.Root
//     ref={ref}
//     className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
//     {...props}
//   />
// ))
// Avatar.displayName = AvatarPrimitive.Root.displayName

// const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
//   <AvatarPrimitive.Image
//     ref={ref}
//     className={cn("aspect-square h-full w-full", className)}
//     {...props}
//   />
// ))
// AvatarImage.displayName = AvatarPrimitive.Image.displayName

// const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
//   <AvatarPrimitive.Fallback
//     ref={ref}
//     className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
//     {...props}
//   />
// ))
// AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

// export { Avatar, AvatarImage, AvatarFallback }
// `,
//                 },
//               },

//               "dropdown-menu.jsx": {
//                 file: {
//                   contents: `import * as React from "react"
// import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
// import { Check, ChevronRight, Circle } from "lucide-react"
// import { cn } from "@/lib/utils"

// const DropdownMenu = DropdownMenuPrimitive.Root
// const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
// const DropdownMenuGroup = DropdownMenuPrimitive.Group
// const DropdownMenuPortal = DropdownMenuPrimitive.Portal
// const DropdownMenuSub = DropdownMenuPrimitive.Sub
// const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

// const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
//   <DropdownMenuPrimitive.Portal>
//     <DropdownMenuPrimitive.Content
//       ref={ref}
//       sideOffset={sideOffset}
//       className={cn(
//         "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
//         className
//       )}
//       {...props}
//     />
//   </DropdownMenuPrimitive.Portal>
// ))
// DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

// const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => (
//   <DropdownMenuPrimitive.Item
//     ref={ref}
//     className={cn(
//       "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
//       inset && "pl-8",
//       className
//     )}
//     {...props}
//   />
// ))
// DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

// const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
//   <DropdownMenuPrimitive.Label
//     ref={ref}
//     className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
//     {...props}
//   />
// ))
// DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

// const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
//   <DropdownMenuPrimitive.Separator
//     ref={ref}
//     className={cn("-mx-1 my-1 h-px bg-muted", className)}
//     {...props}
//   />
// ))
// DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

// export {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuPortal,
//   DropdownMenuSub,
//   DropdownMenuRadioGroup,
// }
// `,
//                 },
//               },

//               "toast.jsx": {
//                 file: {
//                   contents: `import * as React from "react"
// import * as ToastPrimitives from "@radix-ui/react-toast"
// import { cva } from "class-variance-authority"
// import { X } from "lucide-react"
// import { cn } from "@/lib/utils"

// const ToastProvider = ToastPrimitives.Provider

// const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
//   <ToastPrimitives.Viewport
//     ref={ref}
//     className={cn(
//       "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
//       className
//     )}
//     {...props}
//   />
// ))
// ToastViewport.displayName = ToastPrimitives.Viewport.displayName

// const toastVariants = cva(
//   "group pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all",
//   {
//     variants: {
//       variant: {
//         default: "border bg-background text-foreground",
//         destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
//       },
//     },
//     defaultVariants: { variant: "default" },
//   }
// )

// const Toast = React.forwardRef(({ className, variant, ...props }, ref) => (
//   <ToastPrimitives.Root
//     ref={ref}
//     className={cn(toastVariants({ variant }), className)}
//     {...props}
//   />
// ))
// Toast.displayName = ToastPrimitives.Root.displayName

// const ToastAction = React.forwardRef(({ className, ...props }, ref) => (
//   <ToastPrimitives.Action
//     ref={ref}
//     className={cn(
//       "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-1 focus:ring-ring disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
//       className
//     )}
//     {...props}
//   />
// ))
// ToastAction.displayName = ToastPrimitives.Action.displayName

// const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
//   <ToastPrimitives.Close
//     ref={ref}
//     className={cn(
//       "absolute right-1 top-1 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100",
//       className
//     )}
//     toast-close=""
//     {...props}
//   >
//     <X className="h-4 w-4" />
//   </ToastPrimitives.Close>
// ))
// ToastClose.displayName = ToastPrimitives.Close.displayName

// const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
//   <ToastPrimitives.Title
//     ref={ref}
//     className={cn("text-sm font-semibold [&+div]:text-xs", className)}
//     {...props}
//   />
// ))
// ToastTitle.displayName = ToastPrimitives.Title.displayName

// const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
//   <ToastPrimitives.Description
//     ref={ref}
//     className={cn("text-sm opacity-90", className)}
//     {...props}
//   />
// ))
// ToastDescription.displayName = ToastPrimitives.Description.displayName

// export {
//   ToastProvider,
//   ToastViewport,
//   Toast,
//   ToastTitle,
//   ToastDescription,
//   ToastClose,
//   ToastAction,
// }
// `,
//                 },
//               },

//               "dialog.jsx": {
//                 file: {
//                   contents: `import * as React from "react"
// import * as DialogPrimitive from "@radix-ui/react-dialog"
// import { X } from "lucide-react"
// import { cn } from "@/lib/utils"

// const Dialog = DialogPrimitive.Root
// const DialogTrigger = DialogPrimitive.Trigger
// const DialogPortal = DialogPrimitive.Portal
// const DialogClose = DialogPrimitive.Close

// const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
//   <DialogPrimitive.Overlay
//     ref={ref}
//     className={cn(
//       "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
//       className
//     )}
//     {...props}
//   />
// ))
// DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

// const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
//   <DialogPortal>
//     <DialogOverlay />
//     <DialogPrimitive.Content
//       ref={ref}
//       className={cn(
//         "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
//         className
//       )}
//       {...props}
//     >
//       {children}
//       <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
//         <X className="h-4 w-4" />
//         <span className="sr-only">Close</span>
//       </DialogPrimitive.Close>
//     </DialogPrimitive.Content>
//   </DialogPortal>
// ))
// DialogContent.displayName = DialogPrimitive.Content.displayName

// const DialogHeader = ({ className, ...props }) => (
//   <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
// )
// DialogHeader.displayName = "DialogHeader"

// const DialogFooter = ({ className, ...props }) => (
//   <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
// )
// DialogFooter.displayName = "DialogFooter"

// const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
//   <DialogPrimitive.Title
//     ref={ref}
//     className={cn("text-lg font-semibold leading-none tracking-tight", className)}
//     {...props}
//   />
// ))
// DialogTitle.displayName = DialogPrimitive.Title.displayName

// const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
//   <DialogPrimitive.Description
//     ref={ref}
//     className={cn("text-sm text-muted-foreground", className)}
//     {...props}
//   />
// ))
// DialogDescription.displayName = DialogPrimitive.Description.displayName

// export {
//   Dialog,
//   DialogPortal,
//   DialogOverlay,
//   DialogTrigger,
//   DialogClose,
//   DialogContent,
//   DialogHeader,
//   DialogFooter,
//   DialogTitle,
//   DialogDescription,
// }
// `,
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };
