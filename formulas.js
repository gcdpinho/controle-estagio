if (estagio.outro == "sim" || periodo.dataFinal <= periodo.dataInicial || documentos.assinados == "não" || documentos.dadosCertos == "não" || documentos.constaNumero == "não" || periodo.doisAnos == "sim" ||
    (estagio.modalidade == "Não-Obrigatório" && seguro.cargo == "Inst. Ensino") || (matricula.formado == "não" && (periodo.cargaHorario.cargaDiaria > 6 || periodo.cargaHorario.cargaSemanal > 30)) ||
    ((matricula.formado == "sim" && (periodo.cargaHorario.cargaDiaria > 8 || periodo.cargaHorario.cargaSemanal > 40))) || (estagio.modalidade == "Não-Obrigatório" &&
        (naoObrigatorio.auxTransp == "não" || naoObrigatorio.horarioDist == "não" || naoObrigatorio.formatura < periodo.dataFinal || naoObrigatorio.renovando.repFalta == "sim" || naoObrigatorio.renovando.rep50 == "sim")) ||
    (estagio.modalidade == "Obrigatório" && (curso.sigla == "DES" || curso.sigla == "TSI" || curso.sigla == "TSIAD" || curso.sigla == "DINT" || (curso.sigla == "CVI" && curso.modalidade == "Integrado"))) ||
    (estagio.modalidade == "Obrigatório" && obrigatorio.renovando.renovadoOrientador == "não") || (estagio.modalidade == "Obrigatório" && (obrigatorio.relatorioFinal == "sim" || obrigatorio.obrigatorio12 == "sim" ||
        (documentos.tipo == "TCE" && obrigatorio.cargaHorario.cargaCalculada < obrigatorio.cargaHorario.cargaMinima))) || (seguro.cargo == "Concedente" && documentos.tipo == "TCE" && (seguro.vigencia.vigenciaDataInicial > periodo.dataInicial || seguro.vigencia.vigenciaDataFinal < periodo.dataFinal || seguro.capitalSegurado < 15000 ||
        seguro.coberturas.mac == "não" || seguro.coberturas.ipa == "não" || seguro.entregouApoliceProposta == "não")) || (seguro.cargo == "Concedente" && documentos.tipo == "TA" &&
        (seguro.vigencia.vigenciaDataInicial > periodo.dataInicial || seguro.vigencia.vigenciaDataFinal < periodo.dataFinal || seguro.capitalSegurado < 15000 || seguro.coberturas.mac == "não" || seguro.coberturas.ipa == "não")) || (estagio.modalidade == "Obrigatório" && curso.modalidade == "Integrado" &&
        matricula.semestre < 7 && matricula.formado == "não") || (estagio.modalidade == "Obrigatório" && curso.modalidade == "Integrado" && matricula.semestre == 7 && matricula.dependencia == "sim" && matricula.formado == "não") ||
    (curso.sigla == "MEC" && estagio.modalidade == "Obrigatório" && (curso.modalidade == "Concomitante" || curso.modalidade == "Subsequente") && (matricula.semestre < 2 || (matricula.semestre == 2 && matricula.dependencia == "sim")) &&
        matricula.formado == "não") || (curso.sigla == "EDI" && estagio.modalidade == "Obrigatório" && curso.modalidade == "Subsequente" && (matricula.semestre < 4 || (matricula.semestre == 4 && matricula.dependencia == "sim")) &&
        matricula.formado == "não") || ((curso.sigla == "TRO" || curso.sigla == "EME" || curso.sigla == "QUI" || curso.sigla == "TEL" || curso.sigla == "CVI") && estagio.modalidade == "Obrigatório" &&
        (curso.modalidade == "Subsequente" || curso.modalidade == "Concomitante") || (matricula.semestre < 3 || (matricula.semestre == 3 && matricula.dependencia == "sim")) || matricula.formado == "não") ||
    (estagio.area == "não" && curso.modalidade == "Integrado" && estagio.modalidade == "Obrigatório") || (estagio.area == "não" && curso.modalidade == "Subsequente") ||
    (estagio.area == "não" && curso.modalidade == "Concomitante") || (estagio.area == "não" && curso.modalidade == "Superior") || (estagio.area == "não" && curso.modalidade == "Pós"))
    return "NÃO RECEBER";
else if (aluno.idade == "Menor")
    return "Receber apenas c/ assinatura do responsável e se horário não ultrapassar as 22h, em princípio";
else
    return "Receber, em princípio. Na dúvida, pergunta!"