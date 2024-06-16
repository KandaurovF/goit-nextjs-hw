import AddCompanyButton from './components/AddCompanyButton';
import MagicButton from './components/Magic-button';
import StatusLabel, { Status } from './components/StatusLabel';

export default function Home() {
  return (
    <main>
      <h1 className="text-xl">Home page</h1>
      {/* <StatusLabel status={Status.Active}>Active</StatusLabel>
      <StatusLabel status={Status.NotActive}>Not Active</StatusLabel>
      <StatusLabel status={Status.Pending}>Pending</StatusLabel>
      <StatusLabel status={Status.Suspended}>Suspended</StatusLabel>
      <StatusLabel status={Status.Suspended} disabled>
        Suspended (Disabled)
      </StatusLabel> */}

      <AddCompanyButton />
      <MagicButton />
    </main>
  );
}
