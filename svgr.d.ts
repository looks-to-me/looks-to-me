declare module '*.svg' {
  const content: React.ForwardRefExoticComponent<React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & React.RefAttributes<SVGSVGElement>>;
  export default content;
}
