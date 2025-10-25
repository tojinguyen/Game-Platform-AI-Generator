// Type declarations for CSS modules and global CSS imports
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// For side-effect imports of CSS files
declare module "*.css" {
  const content: any;
  export = content;
}