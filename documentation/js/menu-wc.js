'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">tukki-front documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter additional">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#additional-pages"'
                            : 'data-bs-target="#xs-additional-pages"' }>
                            <span class="icon ion-ios-book"></span>
                            <span>Kuvaus</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="additional-pages"' : 'id="xs-additional-pages"' }>
                                    <li class="link ">
                                        <a href="additional-documentation/web-käyttöliittymän-kuvaus.html" data-type="entity-link" data-context-id="additional">Web-käyttöliittymän kuvaus</a>
                                    </li>
                        </ul>
                    </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-384caab06d11d4484ba851a2cc7fb21075788e9acac25eed1e459619c5acb323f9fed3b4a413f0c9a9ce4992a631ed068752ebbcc6b762c2662088f03df9ea48"' : 'data-bs-target="#xs-components-links-module-AppModule-384caab06d11d4484ba851a2cc7fb21075788e9acac25eed1e459619c5acb323f9fed3b4a413f0c9a9ce4992a631ed068752ebbcc6b762c2662088f03df9ea48"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-384caab06d11d4484ba851a2cc7fb21075788e9acac25eed1e459619c5acb323f9fed3b4a413f0c9a9ce4992a631ed068752ebbcc6b762c2662088f03df9ea48"' :
                                            'id="xs-components-links-module-AppModule-384caab06d11d4484ba851a2cc7fb21075788e9acac25eed1e459619c5acb323f9fed3b4a413f0c9a9ce4992a631ed068752ebbcc6b762c2662088f03df9ea48"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CoreModule.html" data-type="entity-link" >CoreModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CoreModule-a01339c6af162400a3ad5558207bc5e6627ed7ca6c79fb32f85354e39a5d29516df3aa2c26338e65731b0ace712bc8bd5adc983d3f2880b621aae500b6a1cc75"' : 'data-bs-target="#xs-components-links-module-CoreModule-a01339c6af162400a3ad5558207bc5e6627ed7ca6c79fb32f85354e39a5d29516df3aa2c26338e65731b0ace712bc8bd5adc983d3f2880b621aae500b6a1cc75"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CoreModule-a01339c6af162400a3ad5558207bc5e6627ed7ca6c79fb32f85354e39a5d29516df3aa2c26338e65731b0ace712bc8bd5adc983d3f2880b621aae500b6a1cc75"' :
                                            'id="xs-components-links-module-CoreModule-a01339c6af162400a3ad5558207bc5e6627ed7ca6c79fb32f85354e39a5d29516df3aa2c26338e65731b0ace712bc8bd5adc983d3f2880b621aae500b6a1cc75"' }>
                                            <li class="link">
                                                <a href="components/DataConsentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DataConsentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoDataConsentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NoDataConsentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NoPrivilegesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NoPrivilegesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageNotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrivacyModalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrivacyModalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CoreModule-a01339c6af162400a3ad5558207bc5e6627ed7ca6c79fb32f85354e39a5d29516df3aa2c26338e65731b0ace712bc8bd5adc983d3f2880b621aae500b6a1cc75"' : 'data-bs-target="#xs-injectables-links-module-CoreModule-a01339c6af162400a3ad5558207bc5e6627ed7ca6c79fb32f85354e39a5d29516df3aa2c26338e65731b0ace712bc8bd5adc983d3f2880b621aae500b6a1cc75"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CoreModule-a01339c6af162400a3ad5558207bc5e6627ed7ca6c79fb32f85354e39a5d29516df3aa2c26338e65731b0ace712bc8bd5adc983d3f2880b621aae500b6a1cc75"' :
                                        'id="xs-injectables-links-module-CoreModule-a01339c6af162400a3ad5558207bc5e6627ed7ca6c79fb32f85354e39a5d29516df3aa2c26338e65731b0ace712bc8bd5adc983d3f2880b621aae500b6a1cc75"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CourseModule.html" data-type="entity-link" >CourseModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-CourseModule-ce97b5340794b271ae4a454efb86eee37e0fe8a564a88d977f057a8b06a5d5cc3117941e4ca92c621ae1150a9fb2ab89f611d919c3946294bb27e57d3953db24"' : 'data-bs-target="#xs-components-links-module-CourseModule-ce97b5340794b271ae4a454efb86eee37e0fe8a564a88d977f057a8b06a5d5cc3117941e4ca92c621ae1150a9fb2ab89f611d919c3946294bb27e57d3953db24"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CourseModule-ce97b5340794b271ae4a454efb86eee37e0fe8a564a88d977f057a8b06a5d5cc3117941e4ca92c621ae1150a9fb2ab89f611d919c3946294bb27e57d3953db24"' :
                                            'id="xs-components-links-module-CourseModule-ce97b5340794b271ae4a454efb86eee37e0fe8a564a88d977f057a8b06a5d5cc3117941e4ca92c621ae1150a9fb2ab89f611d919c3946294bb27e57d3953db24"' }>
                                            <li class="link">
                                                <a href="components/EditFieldComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditFieldComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/JoinComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JoinComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SettingsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SettingsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CourseRoutingModule.html" data-type="entity-link" >CourseRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FilesizeModule.html" data-type="entity-link" >FilesizeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-FilesizeModule-8f5d65e1f63ed6b4bc27df048c8db724b88390d42d0c10d5b66b28d85f6855c4c1345dcd4b07b31385b3cbd533903efd82da1c3facf2dc71986e6ee3a6952488"' : 'data-bs-target="#xs-pipes-links-module-FilesizeModule-8f5d65e1f63ed6b4bc27df048c8db724b88390d42d0c10d5b66b28d85f6855c4c1345dcd4b07b31385b3cbd533903efd82da1c3facf2dc71986e6ee3a6952488"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-FilesizeModule-8f5d65e1f63ed6b4bc27df048c8db724b88390d42d0c10d5b66b28d85f6855c4c1345dcd4b07b31385b3cbd533903efd82da1c3facf2dc71986e6ee3a6952488"' :
                                            'id="xs-pipes-links-module-FilesizeModule-8f5d65e1f63ed6b4bc27df048c8db724b88390d42d0c10d5b66b28d85f6855c4c1345dcd4b07b31385b3cbd533903efd82da1c3facf2dc71986e6ee3a6952488"' }>
                                            <li class="link">
                                                <a href="pipes/FileSizePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FileSizePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link" >MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-SharedModule-d9b7b22aeac6521199099027657fcc20689d0374d41c5a2da1dcf4d06ff89f7548f7aaf68cc0c7bb6d2ed737494d1f8352c1cf8b992d7d78f04b48e34e7931aa"' : 'data-bs-target="#xs-components-links-module-SharedModule-d9b7b22aeac6521199099027657fcc20689d0374d41c5a2da1dcf4d06ff89f7548f7aaf68cc0c7bb6d2ed737494d1f8352c1cf8b992d7d78f04b48e34e7931aa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-d9b7b22aeac6521199099027657fcc20689d0374d41c5a2da1dcf4d06ff89f7548f7aaf68cc0c7bb6d2ed737494d1f8352c1cf8b992d7d78f04b48e34e7931aa"' :
                                            'id="xs-components-links-module-SharedModule-d9b7b22aeac6521199099027657fcc20689d0374d41c5a2da1dcf4d06ff89f7548f7aaf68cc0c7bb6d2ed737494d1f8352c1cf8b992d7d78f04b48e34e7931aa"' }>
                                            <li class="link">
                                                <a href="components/BeginningButtonComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BeginningButtonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ErrorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ErrorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeadlineComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeadlineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuLinkComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuLinkComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuSrcComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuSrcComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RefreshDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RefreshDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchBarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SenderInfoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SenderInfoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SuccessComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SuccessComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-SharedModule-d9b7b22aeac6521199099027657fcc20689d0374d41c5a2da1dcf4d06ff89f7548f7aaf68cc0c7bb6d2ed737494d1f8352c1cf8b992d7d78f04b48e34e7931aa"' : 'data-bs-target="#xs-pipes-links-module-SharedModule-d9b7b22aeac6521199099027657fcc20689d0374d41c5a2da1dcf4d06ff89f7548f7aaf68cc0c7bb6d2ed737494d1f8352c1cf8b992d7d78f04b48e34e7931aa"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-d9b7b22aeac6521199099027657fcc20689d0374d41c5a2da1dcf4d06ff89f7548f7aaf68cc0c7bb6d2ed737494d1f8352c1cf8b992d7d78f04b48e34e7931aa"' :
                                            'id="xs-pipes-links-module-SharedModule-d9b7b22aeac6521199099027657fcc20689d0374d41c5a2da1dcf4d06ff89f7548f7aaf68cc0c7bb6d2ed737494d1f8352c1cf8b992d7d78f04b48e34e7931aa"' }>
                                            <li class="link">
                                                <a href="pipes/SafeHtmlPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SafeHtmlPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TicketModule.html" data-type="entity-link" >TicketModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-TicketModule-6eef4db5f99bf78657704b949d9b1219f06d0469aad92c483ddc3dfd26db592a0fa4ed9d9cf49fbceab538f8d0e1e67fd661cf8298b2b2a0f7bc5a8beb4ab8ce"' : 'data-bs-target="#xs-components-links-module-TicketModule-6eef4db5f99bf78657704b949d9b1219f06d0469aad92c483ddc3dfd26db592a0fa4ed9d9cf49fbceab538f8d0e1e67fd661cf8298b2b2a0f7bc5a8beb4ab8ce"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-TicketModule-6eef4db5f99bf78657704b949d9b1219f06d0469aad92c483ddc3dfd26db592a0fa4ed9d9cf49fbceab538f8d0e1e67fd661cf8298b2b2a0f7bc5a8beb4ab8ce"' :
                                            'id="xs-components-links-module-TicketModule-6eef4db5f99bf78657704b949d9b1219f06d0469aad92c483ddc3dfd26db592a0fa4ed9d9cf49fbceab538f8d0e1e67fd661cf8298b2b2a0f7bc5a8beb4ab8ce"' }>
                                            <li class="link">
                                                <a href="components/CommentComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CommentComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditAttachmentsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditAttachmentsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FaqViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FaqViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MessageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubmitFaqComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubmitFaqComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubmitTicketComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubmitTicketComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TicketListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TicketListComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TicketViewComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TicketViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ViewAttachmentsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ViewAttachmentsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/TicketRoutingModule.html" data-type="entity-link" >TicketRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-UserModule-96c252180f20b57eb0b2413f5cda60e91ee68f0c99767f57d0be8b69841c8b73d2d6c1281d015439a7e408de93a4c1f0387d9fd2707cdd85c8a6679c6fa63aee"' : 'data-bs-target="#xs-components-links-module-UserModule-96c252180f20b57eb0b2413f5cda60e91ee68f0c99767f57d0be8b69841c8b73d2d6c1281d015439a7e408de93a4c1f0387d9fd2707cdd85c8a6679c6fa63aee"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserModule-96c252180f20b57eb0b2413f5cda60e91ee68f0c99767f57d0be8b69841c8b73d2d6c1281d015439a7e408de93a4c1f0387d9fd2707cdd85c8a6679c6fa63aee"' :
                                            'id="xs-components-links-module-UserModule-96c252180f20b57eb0b2413f5cda60e91ee68f0c99767f57d0be8b69841c8b73d2d6c1281d015439a7e408de93a4c1f0387d9fd2707cdd85c8a6679c6fa63aee"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserRoutingModule.html" data-type="entity-link" >UserRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AuthDummyData.html" data-type="entity-link" >AuthDummyData</a>
                            </li>
                            <li class="link">
                                <a href="classes/CourseDummyData.html" data-type="entity-link" >CourseDummyData</a>
                            </li>
                            <li class="link">
                                <a href="classes/TicketDummyData.html" data-type="entity-link" >TicketDummyData</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CourseService.html" data-type="entity-link" >CourseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ErrorService.html" data-type="entity-link" >ErrorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StoreService.html" data-type="entity-link" >StoreService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TicketService.html" data-type="entity-link" >TicketService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilsService.html" data-type="entity-link" >UtilsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/CustomHttpInterceptor.html" data-type="entity-link" >CustomHttpInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AddTicketResponse.html" data-type="entity-link" >AddTicketResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthInfo.html" data-type="entity-link" >AuthInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AuthRequestResponse.html" data-type="entity-link" >AuthRequestResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BackendErrorResponse.html" data-type="entity-link" >BackendErrorResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColumnDefinition.html" data-type="entity-link" >ColumnDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColumnDefinition-1.html" data-type="entity-link" >ColumnDefinition</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConsentResponse.html" data-type="entity-link" >ConsentResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Error.html" data-type="entity-link" >Error</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorNotification.html" data-type="entity-link" >ErrorNotification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorNotification-1.html" data-type="entity-link" >ErrorNotification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorNotification-2.html" data-type="entity-link" >ErrorNotification</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileInfo.html" data-type="entity-link" >FileInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FileInfoWithSize.html" data-type="entity-link" >FileInfoWithSize</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GenericResponse.html" data-type="entity-link" >GenericResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InvitedInfo.html" data-type="entity-link" >InvitedInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Kentta.html" data-type="entity-link" >Kentta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Kenttapohja.html" data-type="entity-link" >Kenttapohja</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Kommentti.html" data-type="entity-link" >Kommentti</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Kurssi.html" data-type="entity-link" >Kurssi</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Kurssini.html" data-type="entity-link" >Kurssini</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Liite.html" data-type="entity-link" >Liite</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginInfo.html" data-type="entity-link" >LoginInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginResponse.html" data-type="entity-link" >LoginResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/LoginResult.html" data-type="entity-link" >LoginResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Minun.html" data-type="entity-link" >Minun</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MinunAsetukset.html" data-type="entity-link" >MinunAsetukset</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewCommentResponse.html" data-type="entity-link" >NewCommentResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SortableTicket.html" data-type="entity-link" >SortableTicket</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tiketti.html" data-type="entity-link" >Tiketti</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TikettiListanKentta.html" data-type="entity-link" >TikettiListanKentta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TikettiListassa.html" data-type="entity-link" >TikettiListassa</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tikettipohja.html" data-type="entity-link" >Tikettipohja</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UKK.html" data-type="entity-link" >UKK</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UKKlistanKentta.html" data-type="entity-link" >UKKlistanKentta</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRights.html" data-type="entity-link" >UserRights</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UusiTiketti.html" data-type="entity-link" >UusiTiketti</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UusiUKK.html" data-type="entity-link" >UusiUKK</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});