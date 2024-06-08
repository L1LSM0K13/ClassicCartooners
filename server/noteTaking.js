async function takeNote(app, pool) {
	app.get("/users/bible", async (req, res) => {
		const { defaultRender } = require("./defaultValues");
		const renderData = {
			bookText: bookText,
			bookChapters: chapters,
			bookTitleOptions: bookTitles,
			selectedBook: defaultBook,
			selectedChapter: defaultChapter,
			nextBook: nextBook,
			nextChapter: nextChapter,
			previousBook: previousBook,
			previousChapter: previousChapter,
		};

		await defaultRender(req, res, true, "../public/views/scripture", {
			errors: [],
			renderData,
		});
	});

	app.post("/users/bible", async (req, res) => {
		const { defaultRender } = require("./defaultValues");
		let { noteText } = req.body;
		let errors = [];
		const renderData = {
			bookText: bookText,
			bookChapters: chapters,
			bookTitleOptions: bookTitles,
			selectedBook: defaultBook,
			selectedChapter: defaultChapter,
			nextBook: nextBook,
			nextChapter: nextChapter,
			previousBook: previousBook,
			previousChapter: previousChapter,
		};

		if (!noteText) {
			errors.push({ message: "Note cannot be blank." });
		}

		if (errors.length > 0) {
			await defaultRender(req, res, true, "../public/views/scripture", {
				renderData,
			});
		} else {
			const result = await pool.query(
				`INSERT INTO notes (text)
				VALUES ($1)
				RETURNING id, text`,
				[noteText]
			);
			console.table([result.rows]);
			await defaultRender(req, res, true, "../public/views/scripture", {
				renderData,
			});
		}
	});
}

module.exports = { takeNote };
