block('page').mod('page', 'error')(
    def()(function () {
        return applyNext({ isErrorPage: true });
    })
);
