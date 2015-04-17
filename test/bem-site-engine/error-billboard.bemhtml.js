block('error-billboard')(
    content()(function () {
        var code = this.ctx.code;

        return [
            {
                elem: 'logo'
            },
            {
                elem: 'panel',
                content: [
                    {
                        elem: 'title',
                        code: code
                    },
                    {
                        elem: 'description',
                        code: code
                    },
                    {
                        elem: 'report'
                    },
                    {
                        elem: 'sitemap'
                    }

                ]
            }
        ];
    }),

    elem('title')(
        tag()('h1'),

        content()(function () {
            var code = this.ctx.code;

            return BEM.I18N('error-billboard', 'title') + (code ? (' ' + code) : '');
        })
    ),

    elem('description')(
        def()(match(function () {
            return !this.ctx.code;
        })(false)),

        tag()('h3'),

        content()(function () {
            return BEM.I18N('error-billboard', 'description') + this.ctx.code;
        })
    ),

    elem('report')(
        tag()('h3'),

        content()(function () {
            return [
                {
                    tag: 'span',
                    content: BEM.I18N('error-billboard', 'report')
                },
                {
                    block: 'link',
                    url: 'mailto:info@bem.info',
                    content: 'info@bem.info'
                }
            ];
        })
    ),

    elem('sitemap')(
        content()(function () {
            return {
                block: 'link',
                url: '/tags',
                content: BEM.I18N('error-billboard', 'sitemap')
            };
        })
    )
);
