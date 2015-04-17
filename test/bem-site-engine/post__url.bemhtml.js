block('post').elem('url')(
    match(function () {
        return !(this.ctx.content || []).length; }
    ).def()(false),

    content()(function () {
        return {
            block: 'link',
            url: this.ctx.content,
            attrs: { target: '_blank' },
            content: [
                {
                    block: 'icon',
                    mods: { view: 'github' }
                },
                BEM.I18N('post', 'url')
            ]
        };
    })
);
