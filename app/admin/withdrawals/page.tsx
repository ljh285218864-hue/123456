import WithdrawalReviewButton from '@/components/WithdrawalReviewButton';

export default function WithdrawalsPage() {
  return (
    <>
      <h1>提现审核</h1>
      <p className="muted">最低提现 $100。支持 PayPal 或银行卡人工打款。审核期 1-2 天，用户提交后不能自行取消。</p>
      <div className="grid grid-3" style={{ marginBottom: 20 }}>
        <div className="card stat"><span className="muted">待审核</span><strong>18</strong></div>
        <div className="card stat"><span className="muted">待打款金额</span><strong>$2,640</strong></div>
        <div className="card stat"><span className="muted">本月已打款</span><strong>$9,820</strong></div>
      </div>
      <table className="table"><thead><tr><th>用户</th><th>金额</th><th>方式</th><th>账户资料</th><th>状态</th><th>操作</th></tr></thead><tbody><tr><td>U1002</td><td>$120</td><td>PayPal</td><td>emma@example.com</td><td>待审核</td><td><WithdrawalReviewButton withdrawalId="demo-withdrawal-id" action="APPROVE" /><WithdrawalReviewButton withdrawalId="demo-withdrawal-id" action="REJECT" /><WithdrawalReviewButton withdrawalId="demo-withdrawal-id" action="PAID" /></td></tr></tbody></table>
    </>
  );
}
