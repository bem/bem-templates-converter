block('post').elem('deps')(
    match(function () { return !(this.ctx && this.ctx.content); }).def()(false),

    content()(function () {
        var libs = this.ctx.content;

        return [{
                block: 'post',
                elem: 'title',
                elemMods: { level: '3' },
                content: BEM.I18N('post', 'deps')
            }].concat(Object.keys(libs).map(function (lib) {
                var libUrl = libs[lib],
                    hashIndex = libUrl.indexOf('#'),
                    isFullPath = hashIndex > -1,
                    version = isFullPath ? '@' + libUrl.substr(hashIndex + 1) : '',
                    text = lib + version;

                return {
                    content: [
                        '— ',
                        isFullPath ? {
                            block: 'link',
                            url: libUrl.replace('git:', 'https:'),
                            attrs: { target: '_blank' },
                            content: text
                        } : text
                    ]
                };
            })
        );
    })
);
