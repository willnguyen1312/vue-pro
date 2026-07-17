const VALUE_CREATED = 'created'
const VALUE_UPDATED = 'updated'
const VALUE_DELETED = 'deleted'
const VALUE_UNCHANGED = 'unchanged'

const isFunction = (x: unknown): x is (...args: unknown[]) => unknown =>
  Object.prototype.toString.call(x) === '[object Function]'

const isArray = (x: unknown): x is unknown[] =>
  Object.prototype.toString.call(x) === '[object Array]'

const isDate = (x: unknown): x is Date =>
  Object.prototype.toString.call(x) === '[object Date]'

const isObject = (x: unknown): x is Record<string, unknown> =>
  Object.prototype.toString.call(x) === '[object Object]'

const isValue = (x: unknown): boolean => !isObject(x) && !isArray(x)

const toRecord = (value: unknown): Record<string, unknown> =>
  typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : {}

const compareValues = (value1: unknown, value2: unknown): string => {
  if (value1 === value2) {
    return VALUE_UNCHANGED
  }
  if (isDate(value1) && isDate(value2) && value1.getTime() === value2.getTime()) {
    return VALUE_UNCHANGED
  }
  if (value1 === undefined) {
    return VALUE_CREATED
  }
  if (value2 === undefined) {
    return VALUE_DELETED
  }
  return VALUE_UPDATED
}

const map = (obj1: unknown, obj2: unknown): unknown => {
  if (isFunction(obj1) || isFunction(obj2)) {
    throw new Error('Invalid argument. Function given, object expected.')
  }
  if (isValue(obj1) || isValue(obj2)) {
    return {
      type: compareValues(obj1, obj2),
      data: obj1 === undefined ? obj2 : obj1
    }
  }

  const record1 = toRecord(obj1)
  const record2 = toRecord(obj2)
  const diff: Record<string, unknown> = {}

  for (const key in record1) {
    if (isFunction(record1[key])) {
      continue
    }

    diff[key] = map(record1[key], record2[key])
  }

  for (const key in record2) {
    if (isFunction(record2[key]) || diff[key] !== undefined) {
      continue
    }

    diff[key] = map(undefined, record2[key])
  }

  return diff
}

const result = map(
  {
    a: 'i am unchanged',
    b: 'i am deleted',
    e: {
      a: 1,
      b: false,
      c: null
    },
    f: [
      1,
      {
        a: 'same',
        b: [
          {
            a: 'same'
          },
          {
            d: 'delete'
          }
        ]
      }
    ],
    g: new Date('2017.11.25')
  },
  {
    a: 'i am unchanged',
    c: 'i am created',
    e: {
      a: '1',
      b: '',
      d: 'created'
    },
    f: [
      {
        a: 'same',
        b: [
          {
            a: 'same'
          },
          {
            c: 'create'
          }
        ]
      },
      1
    ],
    g: new Date('2017.11.25')
  }
)

describe('sample test', () => {
  it('should work', () => {
    console.log(JSON.stringify(result, null, 2))
  })
})
