
import Button from "../components/Button";

export default function Dashboard() {
  return (
    <>
      <h1 className="border-gray-400">React Router Contacts</h1>
      <div>
        <form id="search-form" role="search">
          <Button type="submit">Search</Button>
          <div id="search-spinner" aria-hidden hidden={true} />
          <div className="sr-only" aria-live="polite"></div>
        </form>
        <form method="post">
          <button type="submit">New</button>
        </form>
      </div>
      <nav>
        <ul>
          <li>
            <a href={`/contacts/1`}>Your Name</a>
          </li>
          <li>
            <a href={`/contacts/2`}>Your Friend</a>
          </li>
        </ul>
      </nav>
    </>
  );
}
