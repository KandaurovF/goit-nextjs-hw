import ActiveLabel from './components/active-label';
import NotActiveLabel from './components/notActive-label';

export default function Home() {
  return (
    <main>
      <h1 className="text-xl">Home page</h1>
      <ActiveLabel>Active lable</ActiveLabel>
      <NotActiveLabel>Not active lable</NotActiveLabel>
    </main>
  );
}
