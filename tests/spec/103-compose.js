import { loginAsFoobar } from '../roles'
import {
  composeInput, getNthComposeReplyButton, getNthComposeReplyInput, getNthReplyButton, getNthStatus, getUrl,
  homeNavButton, notificationsNavButton,
  postStatusButton
} from '../utils'

fixture`103-compose.js`
  .page`http://localhost:4002`

test('statuses show up in home timeline', async t => {
  await loginAsFoobar(t)
  await t
    .typeText(composeInput, 'hello world', { paste: true })
    .click(postStatusButton)
    .expect(getNthStatus(1 + 0).innerText).contains('hello world')
    .click(notificationsNavButton)
    .expect(getUrl()).contains('/notifications')
    .click(homeNavButton)
    .expect(getUrl()).eql('http://localhost:4002/')
    .expect(getNthStatus(1 + 0).innerText).contains('hello world')
    .navigateTo('/')
    .expect(getNthStatus(1 + 0).innerText).contains('hello world')
})

test('statuses in threads show up in right order', async t => {
  await loginAsFoobar(t)
  await t
    .navigateTo('/accounts/5')
    .click(getNthStatus(1 + 2))
    .expect(getUrl()).contains('/statuses')
    .click(getNthReplyButton(1 + 3))
    .typeText(getNthComposeReplyInput(1 + 3), 'my reply!', { paste: true })
    .click(getNthComposeReplyButton(3))
    .expect(getNthComposeReplyInput(1 + 3).exists).notOk()
    .expect(getNthStatus(1 + 5).innerText).contains('@baz my reply!')
    .navigateTo('/accounts/5')
    .click(getNthStatus(1 + 2))
    .expect(getNthStatus(1 + 5).innerText).contains('@baz my reply!')
})
