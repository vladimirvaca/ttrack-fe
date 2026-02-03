import { BlockUI } from 'primereact/blockui';
import { ProgressSpinner } from 'primereact/progressspinner';

const LoadingModal = () => (
  <BlockUI blocked fullScreen>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <ProgressSpinner />
    </div>
  </BlockUI>
);

export default LoadingModal;
