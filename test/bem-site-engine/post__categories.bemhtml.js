block('post').elem('categories')(
    match(function () { return !(this.ctx.breadcrumbs && this.ctx.breadcrumbs.length > 1); })
        .def()(function () {
        return false;
    }),

    match(function () { return this.isArray(this.ctx.breadcrumbs); }).content()(function () {
        var breadcrumbs = this.ctx.breadcrumbs,
            length = breadcrumbs.length - 1,
            buf = [];

        breadcrumbs.forEach(function (item, index) {
            if (!item.title) return;

            var crumb = { block: 'link', content: item.title[this.ctx.lang] };

            if (index > 0) {
                buf.push({
                    tag: 'span',
                    content: ' &rarr; '
                });
            }

            if (index === length) {
                crumb.mods = { pseudo: true };
            } else {
                crumb.url = item.url;
            }

            buf.push(crumb);

        }, this);

        return buf;
    })
);
