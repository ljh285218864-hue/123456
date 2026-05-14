import OfficialAccountGenerateForm from '@/components/OfficialAccountGenerateForm';
import AdminOfficialAccountsTable from '@/components/AdminOfficialAccountsTable';

export default function OfficialAccountsPage() {
  return (
    <>
      <h1>官方账号管理</h1>
      <p className="muted">官方账号前台显示与普通用户一致，后台必须清楚标记。支持一键生成任意数量官方账号。</p>
      <div className="card" style={{ marginBottom: 20 }}>
        <h3>一键生成官方账号</h3>
        <OfficialAccountGenerateForm />
      </div>
      <AdminOfficialAccountsTable />
    </>
  );
}
