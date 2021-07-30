import itemHasOldPassword from '../itemHasOldPassword';

const now = Date.now();
const fifteenDaysAgo = new Date(now - 15 * 24 * 60 * 60 * 1000).toISOString();
const thirtyOneDaysAgo = new Date(now - 31 * 24 * 60 * 60 * 1000).toISOString();

const items = [
  {
    id: '000',
    title: 'discord',
    description: 'rumors',
    password: 'discordPassword123.',
    createdAt: fifteenDaysAgo,
  },
  {
    id: '001',
    title: 'airdroid',
    description: 'replace android',
    password: 'pass1',
    createdAt: thirtyOneDaysAgo,
  },
];

test('should return true if item was created more than 30 days ago', () => {
  expect(itemHasOldPassword(items[0])).toBe(false);
  expect(itemHasOldPassword(items[1])).toBe(true);
});
