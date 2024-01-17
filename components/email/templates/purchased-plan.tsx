/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import * as React from 'react';

interface PurchasedPlanProps {
  userName: string;
  redirectUrl: string;
}

export const PurchasedPlan: React.FC<Readonly<PurchasedPlanProps>> = ({ userName, redirectUrl }) => {
  return (
    <div style={{ backgroundColor: '#727272', textAlign: 'center' }} >
      <table width="100%" cellPadding="0" cellSpacing="0" border={0}>
        <tbody>
          <tr>
            <td valign="top" align="center">
              <table bgcolor="#1d232a" style={{ margin: '0 auto' }} align="center" id="brick_container" cellSpacing="0"
                cellPadding="0" border={0} width="100%">
                <tbody>
                  <tr>
                    <td width="100%">
                      <table cellSpacing="0" width="100%" cellPadding="0" border={0}>
                        <tbody>
                          <tr>
                            <td width="100%" align="center" style={{ backgroundColor: '#1d232a' }}>
                              <table width="100%" border={0} cellPadding="0" cellSpacing="0">
                                <tbody>
                                  <tr>
                                    <td width="100%">
                                      <table width="100%" border={0} cellPadding="0" cellSpacing="0">
                                        <tbody>
                                          <tr>
                                            <td height="8" style={{ height: '8px', minHeight: '8px', lineHeight: '8px' }}></td>
                                          </tr>
                                          <tr style={{ paddingLeft: '12px', paddingRight: '12px' }}>
                                            <td>
                                              <table cellSpacing="0" cellPadding="0" border={0}>
                                                <tbody>
                                                  <tr>
                                                    <td style={{ verticalAlign: 'middle' }}>
                                                      <table width="100%" border={0} cellPadding="0" cellSpacing="0">
                                                        <tbody>
                                                          <tr>
                                                            <td style={{ verticalAlign: 'middle' }} width="100">
                                                              <img
                                                                src="https://plugin.markaimg.com/public/e9beae50/qBs0aXty1Iw6ejIVMWFqFQYQZVkD9v.png" width="100" style={{ border: 0, minWidth: '100px', width: '100px', height: 'auto', display: 'block' }} />
                                                            </td>
                                                            <td style={{ verticalAlign: 'middle' }}>
                                                              <div style={{ lineHeight: '40px', textAlign: 'left' }}>
                                                                <span
                                                                  style={{ color: '#ffffff', fontWeight: 700, fontFamily: 'Roboto, Arial, sans-serif', fontSize: '36px', lineHeight: '40px', textAlign: 'left' }}>
                                                                  Pump
                                                                </span>
                                                              </div>
                                                            </td>
                                                          </tr>
                                                        </tbody>
                                                      </table>
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td width="100%">
                                              <img
                                                src="https://plugin.markaimg.com/public/e9beae50/xffKocuePbb2COg99FxGcClmg9NyJb.png"
                                                width="1106" style={{ border: 0, width: '100%', height: 'auto', display: 'block' }} />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td height="8" style={{ height: '8px', minHeight: '8px', lineHeight: '8px' }}></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td height="52" style={{ height: '52px', minHeight: '52px', lineHeight: '52px' }}></td>
                                  </tr>
                                  <tr>
                                    <td width="100%" align="center">
                                      <table width="100%" border={0} cellPadding="0" cellSpacing="0" style={{ maxWidth: "860px", paddingLeft: "25px", paddingRight: "25px" }}>
                                        <tr>
                                          <td align="center">
                                            <div style={{ lineHeight: "40px", textAlign: "center" }}><span
                                              style={{ color: "#ffffff", fontWeight: "600", fontFamily: "Roboto,Arial,sans-serif", fontSize: "32px", lineHeight: "40px", textAlign: "center" }}>Compra Realizada</span></div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td height="32" style={{ height: "32px", minHeight: "32px", lineHeight: "32px" }}></td>
                                        </tr>
                                        <tr>
                                          <td align="center">
                                            <div style={{ lineHeight: "28px", textAlign: "center", maxWidth: "600px" }}>
                                              <span
                                                style={{ color: "#ffffff", fontFamily: "Roboto,Arial,sans-serif", fontSize: "20px", lineHeight: "28px", textAlign: "center" }}>
                                                Olá, {userName}! A compra do seu plano feito efetuada com sucesso! Para acessar a plataforma, vamos realizar o seu cadastro?
                                              </span>
                                            </div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td height="32" style={{ height: "32px", minHeight: "32px", lineHeight: "32px" }}></td>
                                        </tr>
                                        <tr>
                                          <td width="100%">
                                            <table width="100%" cellSpacing="0" cellPadding="0" border={0}>
                                              <tr>
                                                <td width="100%" align="center" style={{ backgroundColor: "#15191e", borderRadius: "8px", paddingLeft: "25px", paddingRight: "25px" }}>
                                                  <table width="100%" border={0} cellPadding="0" cellSpacing="0">
                                                    <tr>
                                                      <td height="32" style={{ height: "32px", minHeight: "32px", lineHeight: "32px" }}>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td align="center">
                                                        <table cellSpacing="0" cellPadding="0" border={0}>
                                                          <tr>
                                                            <td align="center">
                                                              <div style={{ lineHeight: "40px", textAlign: "center" }}>
                                                                <span style={{ color: "#ffffff", fontWeight: "600", fontFamily: "Roboto,Arial,sans-serif", fontSize: "16px", lineHeight: "20px", textAlign: "center" }}>
                                                                  Clique <a href={redirectUrl} style={{ color: "#ff2cff", fontFamily: "Roboto,Arial,sans-serif", fontSize: "16px", textDecoration: "underline" }}>aqui</a> para realizar o cadastro</span>
                                                              </div>
                                                            </td>
                                                          </tr>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                    <tr>
                                                      <td height="32" style={{ height: "32px", minHeight: "32px", lineHeight: "32px" }}>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td height="52" style={{ height: "32px", minHeight: "32px", lineHeight: "32px" }}>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td width="100%" align="center" style={{ paddingLeft: "25px", paddingRight: "25px" }}>
                                      <table width="100%" border={0} cellPadding="0" cellSpacing="0">
                                        <tr>
                                          <td align="center">
                                            <div style={{ lineHeight: "20px", textAlign: "center", maxWidth: "548px" }}><span
                                              style={{ color: "#d1d1d1", fontFamily: "Roboto,Arial,sans-serif", fontSize: "16px", lineHeight: "20px", textAlign: "left" }}>Esta
                                              é uma mensagem gerada automaticamente, portanto não pode ser respondida. Caso voce
                                              tenha duvidas, por favor acesse nosso</span><a href="mailto:official@gopump.co"
                                                style={{ color: "#ff2cff", fontFamily: "Roboto,Arial,sans-serif", fontSize: "16px", lineHeight: "20px", textAlign: "left", textDecoration: "underline" }}>Atendimento</a><span
                                                  style={{ color: "#d1d1d1", fontFamily: "Roboto,Arial,sans-serif", fontSize: "16px", lineHeight: "20px", textAlign: "left" }}>.</span>
                                            </div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td height="12" style={{ height: "12px", minHeight: "12px", lineHeight: "12px" }}></td>
                                        </tr>
                                        <tr>
                                          <td width="100%" align="center">
                                            <table border={0} cellPadding="0" cellSpacing="0">
                                              <tr>
                                                <td align="center">
                                                  <div style={{ lineHeight: "40px", textAlign: "center" }}><a
                                                    style={{ color: "#ff2cff", fontFamily: "Roboto,Arial,sans-serif", fontSize: "16px", lineHeight: "40px", textAlign: "center", textDecoration: "underline" }}
                                                    href="https://gopump.co/tos">Termos de Uso</a></div>
                                                </td>
                                                <td align="center">
                                                  <div style={{ lineHeight: "40px", textAlign: "center" }}><span
                                                    style={{ color: "#b3b3b3", fontFamily: "Roboto,Arial,sans-serif", fontSize: "16px", lineHeight: "40px", textAlign: "center" }}> | </span></div>
                                                </td>
                                                <td align="center">
                                                  <div style={{ lineHeight: "40px", textAlign: "center" }}>
                                                    <span
                                                      style={{ color: "#b3b3b3", fontFamily: "Roboto,Arial,sans-serif", fontSize: "16px", lineHeight: "40px", textAlign: "center", }}>
                                                    </span>
                                                    <a
                                                      style={{ color: "#ff2cff", fontFamily: "Roboto,Arial,sans-serif", fontSize: "16px", lineHeight: "40px", textAlign: "center", textDecoration: "underline" }}
                                                      href="https://gopump.co/privacy-policy">Politica de Privacidade
                                                    </a>
                                                  </div>
                                                </td>
                                                <td align="center">
                                                  <div style={{ lineHeight: "40px", textAlign: "center" }}>
                                                    <span
                                                      style={{ color: "#b3b3b3", fontFamily: "Roboto,Arial,sans-serif", fontSize: "16px", lineHeight: "40px", textAlign: "center" }}>
                                                      .
                                                    </span>
                                                  </div>
                                                </td>
                                              </tr>
                                            </table>
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td height="80" style={{ height: "80px", minHeight: "80px", lineHeight: "80px" }}></td>
                                  </tr>
                                  {/* ...Continuação do conteúdo... */}
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div >
  );
}