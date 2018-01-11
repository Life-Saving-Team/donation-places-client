import { debounce } from './utility';
describe('Utility: debounce function', () => {
    it('should not invoke function except after delay without immediate parameter', (done) => {
        const fn = (x) => 2 * x
        debounce(fn, 10)()
        setTimeout(() => {
            done()
        }, 20)
    })


    it('should not invoke function except after delay with immediate parameter', (done) => {
        const fn = (x) => 2 * x
        debounce(fn, 10, true)()
        setTimeout(() => {
            done()
        }, 20)
    })
})


