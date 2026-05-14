import { MEMBER_LEVELS } from '@/lib/constants';

export default function LevelsPage() {
  return (
    <>
      <h1>会员等级管理</h1>
      <p className="muted">等级影响推荐曝光权重。黑金会员可获得额外平台奖励资格，用户端仍统一显示佣金。</p>
      <table className="table">
        <thead><tr><th>中文等级</th><th>英文名称</th><th>有效邀请数</th><th>曝光权重</th><th>推荐池</th><th>额外奖励资格</th></tr></thead>
        <tbody>{MEMBER_LEVELS.map(level => <tr key={level.key}><td>{level.zh}</td><td>{level.en}</td><td>{level.validInvites}</td><td>{level.exposureWeight}x</td><td>{level.pool}</td><td>{level.bonusEligible ? '是' : '否'}</td></tr>)}</tbody>
      </table>
    </>
  );
}
