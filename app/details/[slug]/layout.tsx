export const revalidate = 0;

export default function DetailsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <> {children}</>;
}
