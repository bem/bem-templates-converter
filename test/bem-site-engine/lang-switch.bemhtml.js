block('lang-switch')(
    content()(function () {
        return {
            block: 'link',
            url: this.ctx.url,
            content: BEM.I18N('lang-switch', 'name')
        };
    })
);
