import emit from '@/utils/observer/emit'
import on from '@/utils/observer/on'

describe('emit() 方法', () => {
  let author = ''
  let authorCount = 0

  let career = ''
  let careerCount = 0

  let years = 0
  let yearsCount = 0

  const handlerAuthor = function (data) {
    author = data.author
    authorCount += 1
  }
  const handlerCareer = function (data) {
    career = data.career
    careerCount += 1
  }
  const handlerYears = function (data) {
    years = data.years
    yearsCount += 1
  }
  const PAYLOAD = { author: 'Robert Yao', career: 'programmer', years: 20 }

  on('author', handlerAuthor)
  on('author.career', handlerCareer)
  on('author.career.years', handlerYears)

  it("emit('javascript'), javascript 主题无订阅者：", () => {
    jest.useFakeTimers()
    const result = emit('javascript', PAYLOAD)

    jest.advanceTimersByTime(12)

    expect(result).toBe(false)
  })

  it("emit('author'), author 主题有订阅者：", () => {
    jest.useFakeTimers()
    emit('author', { author: 'Robert Yao' })

    jest.advanceTimersByTime(12)

    expect(authorCount).toEqual(1)
    expect(author).toEqual('Robert Yao')
  })

  it("emit('author.career'), author 和 author.career 主题有订阅者：", () => {
    jest.useFakeTimers()

    emit('author.career', PAYLOAD)

    jest.advanceTimersByTime(12)

    expect(author).toEqual('Robert Yao')
    expect(authorCount).toEqual(2)
    expect(career).toEqual('programmer')
    expect(careerCount).toEqual(1)

    emit('author.career.years', PAYLOAD)

    jest.advanceTimersByTime(12)

    expect(yearsCount).toEqual(1)
    expect(years).toEqual(20)
    expect(authorCount).toEqual(3)
    expect(author).toEqual('Robert Yao')
    expect(career).toEqual('programmer')
    expect(careerCount).toEqual(2)
  })

  it("emit('author.age'), author 主题有订阅者，age 主题无订阅者：", () => {
    jest.useFakeTimers()

    emit('author.age', PAYLOAD)

    jest.advanceTimersByTime(12)

    expect(authorCount).toEqual(3)
    expect(author).toEqual('Robert Yao')
    expect(career).toEqual('programmer')
    expect(careerCount).toEqual(2)
  })
})
