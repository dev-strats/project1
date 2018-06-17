import React, { PropTypes } from 'react';

const styles = {
    aaa: {
        display : 'block'
    }
}

const HomePage = () => ({
    render() {
        return (
           <div className="access-hp-video-container-overlay">
                <div className="container bannerInner">
                    <div className="bannerTop">
                        <h1 className="access-hp-hero-header">
                            Join the world's top hedge funds
                            <span className="access-hp-desktop-line-break">
                                using Estimize data to generate alpha
                            </span>
                        </h1>
                        <h2 className="access-hp-hero-subheader">
                            We work directly with both quant and discretionary institutions to help them incorporate the
                            Estimize earnings data set into their models and workflow. Have an Estimize team member contact you.
                        </h2>
                        <div className="estimize-row access-hp-hero-touch">
                            <div className="estimize-column span-50">
                                <h3 className="access-hp-hero-touch-title">
                                    Contribute now to access the most accurate earnings estimates this quarter
                                    <a href="/users/sign_up">
                                        <div className="access-hp-hero-touch-button access-hp-hero-touch-button-signup">
                                            SIGN UP FREE
                                        </div>
                                    </a>
                                </h3>
                            </div>
                            <div className="estimize-column span-50">
                                <h3 className="access-hp-hero-touch-title">
                                    Learn how the world's top hedge funds use Estimize data to generate alpha
                                    <a href="/access/quant">
                                        <div className="access-hp-hero-touch-button access-hp-hero-touch-button-contact">
                                            CONTACT US
                                        </div>
                                    </a>
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="form-container">
                        <form className="estimize-form access-hp-form" id="access-hp-form-upper" >
                            <input name="utf8" type="hidden" value="✓" />
                            <input type="hidden" name="authenticity_token" value="YJi2w22zXS5GoRXZvIMTFYyrUjlJiRoAKU8WSv8R1AP7vHfeOT6F7+dIm7/nK4HxmQO66TtePKGVflVXrQEL0A==" />
                            <div className="estimize-row access-hp-form-upper-row">
                                <div className="estimize-column span-50">
                                    <div className="access-hp-form-label">Name</div>
                                    <input type="text" name="contact_panel[name]" id="contact_panel_name" className="access-hp-form-input" />
                                </div>
                                <div className="estimize-column span-50">
                                    <div className="access-hp-form-label">Phone</div>
                                    <input type="tel" name="contact_panel[number]" id="contact_panel_number" className="access-hp-form-input" />
                                </div>
                            </div>
                            <div className="estimize-row access-hp-form-lower-row">
                                <div className="estimize-column span-50">
                                    <div className="access-hp-form-label">Email</div>
                                    <input type="email" name="contact_panel[email]" id="contact_panel_email" className="access-hp-form-input" />
                                </div>
                                <div className="estimize-column span-50">
                                    <div className="access-hp-form-label">Firm</div>
                                    <input type="text" name="contact_panel[company]" id="contact_panel_company" className="access-hp-form-input" />
                                </div>
                            </div>
                            <input type="hidden" name="contact_panel[to]" id="contact_panel_to" value="sales" />
                            <input type="hidden" name="contact_panel[subject]" id="contact_panel_subject" value="Sale Page Homepage Request" />
                            <div className="estimize-row">
                                <input type="submit" name="commit" value="Request Info" className="access-hp-form-button" />
                            </div>
                            <div className="estimize-row">
                                <p className="error-list"></p>
                            </div>
                        </form>
                    </div>

                    <div className="bannerBot">
                        <div className="access-hp-hero-signup">
                            <h3 className="access-hp-hero-signup-text">
                                WANT TO VIEW OUR PROPRIETARY EARNINGS DATA? Contribute your own earnings estimates.
                            </h3>
                            <a href="/users/sign_up">
                                <div className="access-hp-hero-signup-button">
                                    SIGN UP
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="access-hp-press-container">
                    <div className="container">
                        <div className="access-hp-press">
                            <div className="access-hp-press-banner-item access-hp-desktop-only">
                                ESTIMATES
                                <br />
                                QUOTED BY
                            </div>
                            <div className="access-hp-press-banner-item">
                                <img src="/dist/images/home/cnbc-a477d2403c3401ce03b295478ccf5c4d.png" alt="Cnbc" />
                            </div>
                            <div className="access-hp-press-banner-item access-hp-desktop-only">
                                <img src="/dist/images/home/CNN money-c73149792d225933ae5d449d97bd9919.png" alt="Cnn money" />
                            </div>
                            <div className="access-hp-press-banner-item">
                                <img src="/dist/images/home/press-barrons-f2e1f161fde5d945d7a411a9945cf092.png" alt="Press barrons"/>
                            </div>
                            <div className="access-hp-press-banner-item access-hp-desktop-only">
                                <img src="/dist/images/home/press-businessinsider-cb01d0cb9a26933e61e4235d0511032b.png" alt="Press businessinsider"/>
                            </div>
                            <div className="access-hp-press-banner-item">
                                <img src="/dist/images/home/press-marketwatch-f275e57bc98270ac4034123f4806b4f7.png" alt="Press marketwatch"/>
                            </div>
                            <div className="access-hp-press-banner-item access-hp-desktop-only">
                                <img src="/dist/images/home/press-wsj-fd380263581aa173078ab6029acffd99.png" alt="Press wsj"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="access-hp-size-matters">
                    <div className="container">
                        <div className="estimize-row pc_img" >
                            <div className="estimize-column span-50 fade-in-left-el access-hp-hidden fade-in-left">
                                <img className="access-hp-size-matters-macbook" src="/dist/images/home/sample-macbook-a11e8d390030eddb911f7d80d3d0828b.jpg"/>
                            </div>
                            <div className="estimize-column span-50 fade-in-right-el access-hp-hidden fade-in-right">
                                <div className="access-hp-size-matters-text ">
                                    <h1 className="access-hp-red-header access-hp-size-matters-header">
                                        SAMPLE SIZE MATTERS
                                    </h1>
                                    <p>
                                        Estimize crowdsources earnings and economic estimates from 48,868 hedge fund, brokerage, independent and amateur analysts. By collecting estimates from a diverse community of individuals, we've built a highly accurate and representative data set of true market expectations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="access-hp-five-years">
                    <div className="container">
                        <div className="estimize-row">
                            <h1 className="access-hp-five-years-header">
                                FIVE YEARS OF DATA
                            </h1>
                            <p className="access-hp-five-years-p">
                                Our data set and alpha producing models are growing stronger every quarter.
                            </p>
                        </div>
                        <div className="container">
                            <div className="estimize-row">
                                <div className="estimize-column span-33">
                                    <div className="access-hp-five-years-big-number visible" id="countup-1">48,868</div>
                                    <div className="access-hp-five-years-number-label">
                                        estimize contributors
                                    </div>
                                </div>
                                <div className="estimize-column span-33">
                                    <div className="access-hp-five-years-big-number visible" id="countup-2">2,450</div>
                                    <div className="access-hp-five-years-number-label">stocks covered</div>
                                </div>
                                <div className="estimize-column span-33">
                                    <div className="access-hp-five-years-big-number visible" id="countup-3">659,527</div>
                                    <div className="access-hp-five-years-number-label">estimates created</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="access-hp-why-use-estimize">
                    <div className="container">
                        <h1 className="access-hp-red-header access-hp-why-use-estimize-header">
                            Why use Estimize?
                        </h1>
                        <div className="estimize-row">
                            <div className="estimize-column span-33 access-hp-fade-el access-hp-hidden access-hp-fade">
                                <h2 className="access-hp-why-use-estimize-title">
                                    Quantitative Investors
                                </h2>
                                <p className="access-hp-why-use-estimize-description">
                                    Leverage our data with research-backed
                                    systematic strategies to
                                    produce consistently better returns.
                                </p>
                                <a className="access-hp-why-use-estimize-button" href="/access/quant">
                                    Learn how
                                </a>
                            </div>
                            <div className="estimize-column span-33 access-hp-fade-el access-hp-hidden access-hp-fade">
                                <h2 className="access-hp-why-use-estimize-title">
                                    Discretionary Investors
                                </h2>
                                <p className="access-hp-why-use-estimize-description">
                                    Identify trading and investing
                                    opportunities faster with a seamless
                                    and painless integration of our tools.
                                </p>
                                <a className="access-hp-why-use-estimize-button" href="/access/discretionary">
                                    Learn how
                                </a>
                            </div>
                            <div className="estimize-column span-33 access-hp-fade-el access-hp-hidden access-hp-fade">
                                <h2 className="access-hp-why-use-estimize-title">
                                    Stock Market Enthusiasts
                                </h2>
                                <p className="access-hp-why-use-estimize-description">
                                    View the most accurate and
                                    representative earnings estimates by
                                    contributing your own.
                                </p>
                                <a className="access-hp-why-use-estimize-button access-hp-why-use-estimize-button-outline" href="/users/sign_up">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="access-hp-quotes access-hp-fade-el access-hp-hidden access-hp-fade">
                    <div className="container">
                        <div className="access-hp-quotes-quote" >
                            <div className="estimize-row">
                                <div className="estimize-column span-60">
                                    <p className="access-hp-quotes-quote-text">
                                        <span className="access-hp-quotes-quote-icon">
                                        “
                                        </span>
                                        We found multiple benefits to using the Estimize dataset; especially in the case of short term applications in which accuracy is essential.”
                                    </p>
                                    <span className="access-hp-quotes-quote-author">
                                        —Deutsche Bank Quant Research
                                    </span>
                                </div>
                                <div className="estimize-column span-40">
                                    <div className="access-hp-quotes-quote-logo access-hp-quotes-quote-logo-d-bank">
                                        <img src="/dist/images/home/d-bank-2ef5204d2b55dc45f393dcd1fec90e01.png" alt="D bank" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="access-hp-more-accurate">
                    <div className="container">
                        <h1 className="access-hp-red-header access-hp-fade-el access-hp-more-accurate-header access-hp-hidden access-hp-fade">
                            More accurate than wall street
                            <br/>
                            74% of the time
                        </h1>
                        <div className="row">
                            <div className="access-hp-more-accurate-img estimize-column span-50 col-md-6">
                                <img className="fade-in-left-el access-hp-hidden fade-in-left" src="/dist/images/home/graph-daba529722ec899a00c544e40e9356da.png"/>
                                <p className="graph_p access-hp-more-accurate-img-caption access-hp-fade-el access-hp-hidden access-hp-fade">
                                    This graph shows the percentage of time that Estimize has been more accurate than Wall Street since we began collecting data in 2012.
                                </p>
                            </div>
                            <p className="ctn_p access-hp-more-accurate-text estimize-column span-50 fade-in-right-el access-hp-hidden fade-in-right col-md-6">
                                The Estimize Consensus is consistently more accurate and robust than traditional data sources of Wall Street consensus like Thomson Reuters I/B/E/S. And while 70% of companies beat their Wall Street consensus, only about half will beat Estimize in a given quarter.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="access-hp-request-more access-hp-fade-el access-hp-hidden access-hp-fade">
                    <div className="container">
                        <h1 className="access-hp-request-more-header">Request more information</h1>
                        <h2 className="access-hp-request-more-subheader">
                            We work directly with both quant and discretionary institutions to help them incorporate the
                            Estimize data set into their models and workflow. Have an Estimize team member contact you.
                        </h2>
                        <div className="form-container">
                            <form className="estimize-form access-hp-form" id="access-hp-form-lower" >
                                <input name="utf8" type="hidden" value="✓"/>
                                <input type="hidden" name="authenticity_token" value="U4JrW0BNTgtqyjdqbkB19AbxpJXVOS0vuyLMpNpKUjHIpqpGFMCWyssjuQw16OcQE1lMRafuC44HE4+5iFqN4g=="/>
                                <div className="estimize-row access-hp-form-upper-row">
                                    <div className="estimize-column span-50">
                                        <div className="access-hp-form-label">
                                            Name
                                        </div>
                                        <input type="text" name="contact_panel[name]" id="contact_panel_name" className="access-hp-form-input"/>
                                    </div>
                                    <div className="estimize-column span-50">
                                        <div className="access-hp-form-label">
                                            Phone
                                        </div>
                                        <input type="tel" name="contact_panel[number]" id="contact_panel_number" className="access-hp-form-input"/>
                                    </div>
                                </div>
                                <div className="estimize-row access-hp-form-lower-row">
                                    <div className="estimize-column span-50">
                                        <div className="access-hp-form-label">
                                            Email
                                        </div>
                                        <input type="email" name="contact_panel[email]" id="contact_panel_email" className="access-hp-form-input"/>
                                    </div>
                                    <div className="estimize-column span-50">
                                        <div className="access-hp-form-label">
                                            Firm
                                        </div>
                                        <input type="text" name="contact_panel[company]" id="contact_panel_company" className="access-hp-form-input"/>
                                    </div>
                                </div>
                                <input type="hidden" name="contact_panel[to]" id="contact_panel_to" value="sales"/>
                                <input type="hidden" name="contact_panel[subject]" id="contact_panel_subject" value="Sale Page Homepage Request"/>
                                <div className="estimize-row">
                                    <input type="submit" name="commit" value="Request Info" className="access-hp-form-button"/>
                                </div>
                                <div className="estimize-row">
                                    <p className="error-list"></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
});

export default HomePage;
