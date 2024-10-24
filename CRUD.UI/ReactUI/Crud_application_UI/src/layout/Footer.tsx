
export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year
  return (
    <footer className="bg-body-tertiary text-center text-lg-start">
      <div className="text-center p-3">
        © {currentYear} Copyright
      </div>
    </footer>
  );
}
