export default function Header({ title }: { title: string }) {
  return (
    <div className="sticky top-0 p-3 px-6 text-xl font-medium backdrop-blur">
      {title}
    </div>
  )
}
