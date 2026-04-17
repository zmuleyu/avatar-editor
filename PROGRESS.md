# Avatar Editor — 实施进度

**Plan**: `D:/tools/companion-factory/docs/superpowers/plans/2026-04-17-avatar-editor-implementation.md`
**Branch**: `main` at `D:/tools/avatar-editor`

## Phase 1: 子站 MVP（Tasks 1-12）

- [x] Task 1: Scaffold Next.js 15 + toolchain（10 commits, pnpm build ✅）
- [x] Task 2: protocol.ts TDD（5/5 pass）
- [x] Task 3: usePostMessageBridge TDD（4/4 pass）
- [x] Task 4: bg-remover.ts TDD（3/3 pass）
- [x] Task 5: UploadStage（3/3 pass）
- [x] Task 6: RemoveBgStage（2/2 pass）
- [x] Task 7: EditStage（3/3 pass）
- [x] Task 8: ResultStage（3/3 pass）
- [x] Task 9: EditorRoot + /embed route（3/3 pass）
- [x] Task 10: /standalone + env-detect（2/2 pass）
- [x] Task 11: Landing page
- [x] Task 12: CF Pages adapter + _headers（pages:build 在 Windows 跳过，见 nextjs-routing.md 教训）

**总测试**: 28/28 pass ✅ | **Build**: exit 0 ✅

## Phase 1 Review Checkpoint ✅

- [x] `pnpm test:run` 28/28 pass ✅
- [ ] 手动 `pnpm dev` → `/standalone` 完整流程测试（待执行）
- [x] 推送至 `github.com/zmuleyu/avatar-editor` ✅

## Phase 2: TCF 集成 + 部署（Tasks 13-18）

- [x] Task 13: avatar-editor-bridge.ts in TCF（TDD 3/3 pass）| branch: feat/avatar-editor-bridge ✅
- [ ] Task 14: step-name-avatar.ts 注入按钮（读文件确认 DOM 结构）
- [ ] Task 15: account-modal.ts 注入按钮
- [ ] Task 16: Playwright 跨站 E2E
- [ ] Task 17: CF Pages staging 部署（web dashboard 执行）
- [ ] Task 18: 手动冒烟 + 报告

**TCF 注意**: Phase 2 需在 TCF 建 feature branch（当前在 master）
