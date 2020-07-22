export const Observer = () => {

    const create = options => {

        const change = (entries, observer) => {
            entries.forEach(entry => {
                const unobserve = () => observer.unobserve(entry.target)
                options.callback(
                    entry.target,
                    entry.isIntersecting,
                    unobserve
                )
            })
        }

        const observer = new window.IntersectionObserver(change, {
            root: null,
            rootMargin: `-${options.offset || 0}%`,
            threshold: 0.1
        })

        return {
            observe: node => observer.observe(node)
        }

    }

    return {
        create
    }
}