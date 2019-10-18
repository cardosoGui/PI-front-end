export const emailValidation = str => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(str)
}

export const phoneValidation = str => {
	const re = /^(\d\d)\+?\s?([\d\s]{7,})$/
	return re.test(str)
}

export const CPFValidation = function TestaCPF(strCPF) {
	strCPF = ((strCPF || "").match(/\d/g) || []).join("")

	var Soma
	var Resto
	Soma = 0
	if (strCPF == "00000000000") return false

	for (let i = 1; i <= 9; i++)
		Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
	Resto = (Soma * 10) % 11

	if (Resto == 10 || Resto == 11) Resto = 0
	if (Resto != parseInt(strCPF.substring(9, 10))) return false

	Soma = 0
	for (let i = 1; i <= 10; i++)
		Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
	Resto = (Soma * 10) % 11

	if (Resto == 10 || Resto == 11) Resto = 0
	if (Resto != parseInt(strCPF.substring(10, 11))) return false
	return true
}

export const CNPJValidation = function is_cnpj(c) {
	var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

	if ((c = c.replace(/[^\d]/g, "")).length != 14) return false

	if (/0{14}/.test(c)) return false

	for (var i = 0, n = 0; i < 12; n += c[i] * b[++i]);
	if (c[12] != ((n %= 11) < 2 ? 0 : 11 - n)) return false

	for (var i = 0, n = 0; i <= 12; n += c[i] * b[i++]);
	if (c[13] != ((n %= 11) < 2 ? 0 : 11 - n)) return false

	return true
}

export const DNIValidation = dni => {
	const seqVerify = "TRWAGMYFPDXBNJZSQVHLCKET"
	const DNI_REGEX = /^\d{8}[a-zA-Z]$/

	if (!DNI_REGEX.test(dni)) {
		return false
	}

	const char = dni.substr(dni.length - 1, 1)

	let aux = dni.substr(0, dni.length - 1)
	aux = aux % 23

	const charVerify = seqVerify.substring(aux, aux + 1)

	return charVerify === char.toUpperCase()
}

export const notEmpty = value => value.toString().length > 0

export const URLValidation = url => {
	const re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
	return re.exec(url)
}
