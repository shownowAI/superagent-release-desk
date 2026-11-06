import test from 'node:test';
import assert from 'node:assert/strict';
import { generateReleaseChecklist } from '../src/release-checklist.mjs';
import { initialTasks } from '../src/seed-data.mjs';

test('发布清单只列未完成事项，并包含负责人与截止时间', () => {
  const text = generateReleaseChecklist(initialTasks);
  for (const id of ['REL-001', 'REL-002', 'REL-003', 'REL-004', 'REL-005']) assert.match(text, new RegExp(id));
  assert.match(text, /产品落地页/);
  assert.match(text, /负责人：Candy/);
  assert.match(text, /截止：周五/);
  assert.doesNotMatch(text, /REL-006/);
  assert.doesNotMatch(text, /GitHub 项目/);
});

test('全部完成时返回约定的提示语', () => {
  const allDone = initialTasks.map(task => ({ ...task, status: 'done' }));
  assert.equal(generateReleaseChecklist(allDone), '已经全部准备好了，可以发布');
  assert.equal(generateReleaseChecklist([]), '已经全部准备好了，可以发布');
});

test('生成清单不改动任务数据，任务状态变化后清单随之更新', () => {
  const before = structuredClone(initialTasks);
  generateReleaseChecklist(initialTasks);
  assert.deepEqual(initialTasks, before);
  const updated = initialTasks.map(task => task.id === 'REL-003' ? { ...task, status: 'done' } : task);
  const text = generateReleaseChecklist(updated);
  assert.doesNotMatch(text, /演示视频/);
  assert.doesNotMatch(text, /REL-003/);
});
