import { existsSync } from 'fs'
import { writeFile, mkdir, unlink } from 'fs/promises'
import { join } from 'path'

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData()
		const file = formData.get('file') as File
		const oldImageUrl = formData.get('oldImageUrl') as string | null

		if (!file) {
			return NextResponse.json(
				{ error: 'Nenhum arquivo foi enviado' },
				{ status: 400 },
			)
		}

		// Validar tipo de arquivo
		if (!file.type.startsWith('image/')) {
			return NextResponse.json(
				{ error: 'Apenas imagens são permitidas' },
				{ status: 400 },
			)
		}

		// Validar tamanho (5MB máximo)
		const maxSize = 5 * 1024 * 1024
		if (file.size > maxSize) {
			return NextResponse.json(
				{ error: 'Arquivo muito grande. Máximo: 5MB' },
				{ status: 400 },
			)
		}

		// Criar nome de arquivo seguro
		const timestamp = Date.now()
		const originalName = file.name.toLowerCase().replace(/[^a-z0-9.-]/g, '-')
		const fileName = `${timestamp}-${originalName}`

		// Caminho para salvar o arquivo
		const uploadDir = join(process.cwd(), 'public', 'images', 'cartas')

		// Criar diretório se não existir
		if (!existsSync(uploadDir)) {
			await mkdir(uploadDir, { recursive: true })
		}

		const filePath = join(uploadDir, fileName)

		// Converter File para Buffer e salvar
		const bytes = await file.arrayBuffer()
		const buffer = Buffer.from(bytes)
		await writeFile(filePath, buffer)

		// Deletar imagem antiga se existir e for diferente
		if (oldImageUrl && oldImageUrl.startsWith('/images/cartas/')) {
			try {
				const oldFileName = oldImageUrl.replace('/images/cartas/', '')
				const oldFilePath = join(uploadDir, oldFileName)

				// Verificar se arquivo existe antes de deletar
				if (existsSync(oldFilePath)) {
					await unlink(oldFilePath)
					console.log(`[Upload] Imagem antiga deletada: ${oldImageUrl}`)
				}
			} catch (deleteError) {
				// Log do erro mas não falha o upload
				console.error('[Upload] Erro ao deletar imagem antiga:', deleteError)
			}
		}

		// Retornar caminho relativo da imagem
		const imageUrl = `/images/cartas/${fileName}`

		return NextResponse.json({
			success: true,
			imageUrl,
			fileName,
			oldImageDeleted: !!oldImageUrl,
		})
	} catch (error) {
		console.error('Erro no upload:', error)
		return NextResponse.json(
			{ error: 'Erro ao fazer upload do arquivo' },
			{ status: 500 },
		)
	}
}
