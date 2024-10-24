
export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year
  return (
    <footer className=" text-center text-lg-start bg-secondary text-white">
      <div className="text-center p-3">
        © {currentYear} Copyright
      </div>
    </footer>
  );
}
