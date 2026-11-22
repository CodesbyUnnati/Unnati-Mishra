const filters = document.querySelector('.filters')
const archive = document.querySelector('.talk-list')
const status = document.querySelector('#talk-status')
const buttons = Array.from(filters.querySelectorAll('button'))

function renderTalk(talk) {
  const row = document.createElement('li')
  row.dataset.topic = talk.topics.join(' ')

  const event = document.createElement('div')
  event.className = 'talk-event'
  event.append(String(talk.year), ' ')
  const eventName = document.createElement('span')
  eventName.textContent = talk.event
  event.append(eventName)

  const details = document.createElement('div')
  const title = document.createElement('h3')
  title.textContent = talk.title
  details.append(title)
  if (talk.description) {
    const description = document.createElement('p')
    description.textContent = talk.description
    details.append(description)
  }
  row.append(event, details)

  if (talk.url) {
    const link = document.createElement('a')
    link.href = talk.url
    link.textContent = talk.linkLabel || 'Watch talk'
    link.setAttribute('aria-label', `${link.textContent}: ${talk.title}`)
    row.append(link)
  }
  return row
}

const talks = portfolioTalks.map(renderTalk)
archive.append(...talks)

for (const button of buttons) {
  const topic = button.dataset.filter
  button.hidden = topic !== 'all' && !portfolioTalks.some(talk => talk.topics.includes(topic))
}
filters.hidden = !buttons.some(button => button.dataset.filter !== 'all' && !button.hidden)

filters.addEventListener('click', (event) => {
  const selected = event.target.closest('button[data-filter]')
  if (!selected) return

  for (const button of buttons) {
    button.setAttribute('aria-pressed', String(button === selected))
  }

  const topic = selected.dataset.filter
  for (const [index, talk] of talks.entries()) {
    talk.hidden = topic !== 'all' && !portfolioTalks[index].topics.includes(topic)
  }

  const visible = talks.filter(talk => !talk.hidden).length
  status.textContent = `${visible} ${visible === 1 ? 'talk' : 'talks'} shown.`
})
