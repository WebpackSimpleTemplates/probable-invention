import { AdminTable } from './admin/AdminTable';
import { Table } from './table/Table';

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'grid', gridTemplateColumns: '1fr' }}>
      <AdminTable tableName="rooms" />
    </div>
  )
}

export default App
